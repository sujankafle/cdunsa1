import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MemberListComponent } from "./members/member-list.component";
import { MemberSaveComponent } from "./members/member-save.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { SupportUsComponent } from "./support-us/support-us.component";
import { EventsComponent } from "./events/events.component";
import { RegisterComponent } from "./register/register.component";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MemberListComponent,
    MemberSaveComponent,
    AboutUsComponent,
    SupportUsComponent,
    EventsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      //{ path: 'counter', component: CounterComponent },
      //{ path: 'fetch-data', component: FetchDataComponent },
      { path: 'register', component: RegisterComponent,data: {name:"register"} },
      { path: 'admin/members', component: MemberListComponent },
      { path: 'events', component: EventsComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'support-us', component: SupportUsComponent },
      { path: 'admin/members/add', component: MemberSaveComponent, pathMatch: 'full', data: { name: "add" } },
      { path: 'admin/members/edit/:id', component: MemberSaveComponent, pathMatch: 'full', data: { name: "edit" } }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
