import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserShort } from '../user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private authService : AuthenticationService
  ) { }

  ngOnInit() {
    this.IsUserLoggedIn()
  }

  public pageContent = {
    header: {
      title: 'CareerFirst.com - ',
      strapline: 'Available Jobs:'
    },
    sidebar: 'Easily apply for multiple jobs with a single click! You can check the job application status from the My profile section'
  }

  public IsUserLoggedIn() {                                    
    if(this.authService.isLoggedIn())
    {
      if(document.getElementById("admin")){
        document.getElementById("admin").hidden = false;
      } 
    }
    else{
      if(document.getElementById("admin")){
        document.getElementById("admin").hidden = true;
      } 
    } 
  }

}
