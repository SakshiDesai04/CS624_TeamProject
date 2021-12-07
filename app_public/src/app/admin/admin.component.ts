import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { CareerFirstService } from '../CareerFirst-data.service';
import { Jobs } from '../jobs';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  job: Jobs = new Jobs();
  public allJobs : Jobs[];

  showAdd !: boolean;
  showupdate !: boolean;

  formValue !: FormGroup;
  constructor(private formBuilder: FormBuilder,
  private careerFirstService: CareerFirstService,
  private authService:AuthenticationService,
  private router: Router
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        jobTitle : [''],
        jobDescription : [''],
        primarySkills : [''],
        requiredSkills : [''],
        jobSalary : [''],
        jobLocation : [''],
        experience : [''],
        jobStatus : [''],
        hRName : [''],
        hREmail : [''],
        benefits : ['']
      }
    )
    this.GetAllJobs()
    this.IsUserLoggedIn()
    this.IsUserAdmin() 
  }

  public pageContent = {
    header : {
      title : 'Admin Dashboard:',
      strapline : ''
    }
  };

  InsertJobDetails(){
    this.job.jobTitle =this.formValue.value.jobTitle,
    this.job.jobDescription =this.formValue.value.jobDescription,
    this.job.primarySkills =this.formValue.value.primarySkills,
    this.job.requiredSkills =this.formValue.value.requiredSkills,
    this.job.jobSalary =this.formValue.value.jobSalary,
    this.job.jobLocation =this.formValue.value.jobLocation,
    this.job.experience =this.formValue.value.experience,
    this.job.jobStatus =this.formValue.value.jobStatus,
    this.job.hRName =this.formValue.value.hRName,
    this.job.hREmail =this.formValue.value.hREmail,
    this.job.benefits =this.formValue.value.benefits
    this.job._id = ""

    this.careerFirstService.InsertJobDetails(this.job).then(
      res=>{
        alert("Inserted Job#"+res._id)
        this.formValue.reset();
        let ref = document.getElementById('cancel');
        ref?.click(); 
        this.GetAllJobs()
      }
    )
  }

  GetAllJobs(){
    this.careerFirstService.getJobs().then(
      res=>{
        this.allJobs = res;
      }
    )
  }

  DeleteJob(job:Jobs){
    this.careerFirstService.deleteJob(job._id).then(
      res =>{
        alert("Job#"+job._id+" is deleted")
        this.GetAllJobs()
      }
    )
  }

  onJobEdit(job:Jobs){
    this.showAdd = false;
    this.showupdate = true;
    this.formValue.controls['jobTitle'].setValue(job.jobTitle);
    this.formValue.controls['jobDescription'].setValue(job.jobDescription);
    this.formValue.controls['primarySkills'].setValue(job.primarySkills);
    this.formValue.controls['requiredSkills'].setValue(job.requiredSkills);
    this.formValue.controls['jobSalary'].setValue(job.jobSalary);
    this.formValue.controls['jobLocation'].setValue(job.jobLocation);
    this.formValue.controls['experience'].setValue(job.experience);
    this.formValue.controls['jobStatus'].setValue(job.jobStatus);
    this.formValue.controls['hRName'].setValue(job.hRName);
    this.formValue.controls['hREmail'].setValue(job.hREmail);
    this.formValue.controls['benefits'].setValue(job.benefits);
    this.job._id = job._id
  }

  UpdateJobDetails(){
    this.job.jobTitle =this.formValue.value.jobTitle,
    this.job.jobDescription =this.formValue.value.jobDescription,
    this.job.primarySkills =this.formValue.value.primarySkills,
    this.job.requiredSkills =this.formValue.value.requiredSkills,
    this.job.jobSalary =this.formValue.value.jobSalary,
    this.job.jobLocation =this.formValue.value.jobLocation,
    this.job.experience =this.formValue.value.experience,
    this.job.jobStatus =this.formValue.value.jobStatus,
    this.job.hRName =this.formValue.value.hRName,
    this.job.hREmail =this.formValue.value.hREmail,
    this.job.benefits =this.formValue.value.benefits

    this.careerFirstService.updateJob(this.job,this.job._id).then(
      res =>
      {
        alert("Updated Successfully!");
        this.formValue.reset();
        let ref = document.getElementById('cancel');
        ref?.click(); 
        this.GetAllJobs()
      }
    )
  }

  clickAddJob(){
    this.formValue.reset();
    this.showAdd = true;
    this.showupdate = false;
  }

  public IsUserLoggedIn() {                                    
    if(!this.authService.isLoggedIn())
    {
      this.router.navigateByUrl('/');  
    }
  }

  public IsUserAdmin() {   
    let user = this.authService.getCurrentUser();                                 
    if(user.role!='admin')
    {
      this.router.navigateByUrl('/');  
    }
  }

}
