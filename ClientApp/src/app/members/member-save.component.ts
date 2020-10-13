import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-save',
  templateUrl: './member-save.component.html'
})
export class MemberSaveComponent {
  registrationForm;
  mode;
  editingId;
  saveText = "Register";
  errors = [];
  successfulSave = false;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    @Inject('BASE_URL') private baseUrl: string,
    private route: ActivatedRoute) {

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      course: ['', Validators.required],
      studentNumber: ['', Validators.required],
      phoneNumber: '',
    });


    this.route.data.subscribe((data: any) => {
      this.mode = data.name || "add";
    });

    if (this.mode === "edit") {
      this.saveText = "Update Record";
    }

  }

  ngOnInit() {
    if (this.mode === "edit") {
      this.route.params.subscribe(params => {
        this.editingId = params['id'];
        let endpoint = this.baseUrl + 'api/members/' + this.editingId;
        this.http.get(endpoint)
          .subscribe((data: MemberItem) => {
            delete data.id;
            this.registrationForm.setValue(data);
          });
      });
    }

  }


  validateResponse(err: HttpErrorResponse) {
    this.successfulSave = false;
    if (err.status === 400) {
      // handle validation error
      let validationErrorDictionary = err.error;
      for (var fieldName in validationErrorDictionary) {
        if (validationErrorDictionary.hasOwnProperty(fieldName)) {
          this.errors.push(validationErrorDictionary[fieldName]);
        }
      }
    } else {
      this.errors.push("something went wrong!");
    }


  }


  onSubmit(registrationData: MemberItem) {

    if (this.mode === "add" || this.mode === "register") {
      let endpoint = this.baseUrl + 'api/members';
      this.http.post<any>(endpoint, registrationData)
        .subscribe(data => {

            if (this.mode === "add") {
              document.location.href = "/admin/members";
            }
            if (this.mode === "register") {
              document.location.href = "/";
            }
          },
          err => {
            this.validateResponse(err);
          });
    }
    else {
      let endpoint = this.baseUrl + 'api/members/' + this.editingId;
      this.http.put<any>(endpoint, registrationData)
        .subscribe(data => {
            document.location.href = "/admin/members";
          },
          err => {
            this.validateResponse(err);
          });

    }

  }
}

