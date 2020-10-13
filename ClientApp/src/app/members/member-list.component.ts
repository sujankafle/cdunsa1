import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html'
})
export class MemberListComponent {
  public members: MemberItem[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string)
  {
    http.get<MemberItem[]>(baseUrl + 'api/members').subscribe(result => {
      this.members = result;
    }, error => console.error(error));
  }
}
