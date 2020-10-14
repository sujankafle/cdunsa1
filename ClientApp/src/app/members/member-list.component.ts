import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html'
})
export class MemberListComponent {
  public members: MemberItem[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.http.get<MemberItem[]>(this.baseUrl + 'api/members').subscribe(result => {
      this.members = result;
    }, error => console.error(error));
  }
  delete(id) {
    const ans = confirm('Do you want to delete blog post with id: ' + id);
    if (ans) {
      let endpoint = this.baseUrl + 'api/members/' + id;
      this.http.delete(endpoint).subscribe(result => {
        let index = this.members.findIndex(x => x.id === id);
        debugger;
        if (index > -1) {
          this.members.splice(index, 1);

        }
      }, error => console.error(error));
    }
  }
}

