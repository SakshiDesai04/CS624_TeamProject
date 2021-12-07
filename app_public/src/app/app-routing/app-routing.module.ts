import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }   from '@angular/router';                         
import { HomepageComponent } from '../homepage/homepage.component';    
import { DetailsPageComponent } from '../details-page/details-page.component';             
import { RegisterComponent } from '../register/register.component';     
import { LoginComponent } from '../login/login.component';                                    
import { ProfileComponent } from '../profile/profile.component';
import { AdminComponent } from '../admin/admin.component';

const routes: Routes = [                                               
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'jobs/:jobID',
    component: DetailsPageComponent
  },
  {                                               
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)                                       
  ],
  exports: [RouterModule],                                             
  declarations: []
})
export class AppRoutingModule { }