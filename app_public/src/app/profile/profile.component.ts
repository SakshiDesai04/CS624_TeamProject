import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CareerFirstService } from '../CareerFirst-data.service';
import { UserJobHistory } from '../jobs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private careerFirstService: CareerFirstService,
    private authenticationService: AuthenticationService
    ) { }

  public myJobs : UserJobHistory[];

  public message : string;

  ngOnInit(): void {
    this.getMyJobs();
  }
  
  private getMyJobs(): void {
    this.message = 'Searching My Jobs...';
    console.log("Inside the getMyJobs")
    console.log(this.authenticationService.getCurrentUserID())
    this.careerFirstService.getJobsbyUserID(this.authenticationService.getCurrentUserID())
        .then(foundJobs => {
          this.message = foundJobs.length > 0 ? '' : 'No Jobs found';
          this.myJobs = foundJobs;
          console.log(this.myJobs)
        });
  }

  public pageContent = {
    header: {
      title: 'My Jobs',
      strapline: ':'
    }
  }
}
