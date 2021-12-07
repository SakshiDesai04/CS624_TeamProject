import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CareerFirstService } from '../CareerFirst-data.service';
import {Jobs, UserJobHistory} from '../jobs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  constructor(private careerFirstService: CareerFirstService,
    private authService:AuthenticationService,
    private route: ActivatedRoute
    ) { }
  
  public job: Jobs;

  public message = ''

  ngOnInit(): void {
    this.route.paramMap                                              
    .pipe(                                                          
      switchMap((params: ParamMap) => {                             
         let id = params.get('jobID');                         
         return this.careerFirstService.getJobByJobID(id);          
       })
    )
    .subscribe((job: Jobs) => {  
      this.job = job;                       
    });

    this.message = ''
  }

  public pageContent = {                                              
    header: {                                                         
      title: 'Job Details',
      strapline: ''

    }           
  };

  public OnButtonClick(): void {
    if(this.authService.isLoggedIn())
    {
      this.careerFirstService.UpdateUserJobHistory(this.authService.getCurrentUserID(),{
        "jobID":this.job._id, 
        "status": "Applied",
         "remarks":"None"
         }as UserJobHistory).then(
        res =>{
          this.message = "Applied Successfully!"
        }
      );
    }
    else{
      this.message = "Please login!"
    }
    
  }
}
