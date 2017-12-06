import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { Service } from './service';

import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';

const appRoutes: Routes = [
  { path: 'answer/:id', component: DetailComponent },
  { path: 'answers/:from/:to', component: ListComponent },
  { path: 'answers', component: ListComponent },
  { path: '', redirectTo: '/answers', pathMatch: 'full' }
  
];

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    ListComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
