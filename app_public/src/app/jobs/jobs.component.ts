import { Component, OnInit } from '@angular/core';
import { Jobs } from '../jobs';
import { CareerFirstService } from '../CareerFirst-data.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  public jobs : Jobs[];

  public message: string;

  constructor(
    private careerFirstService: CareerFirstService
  ) { }

  ngOnInit(): void {
    this.getJobs()
  }

  private getJobs(): void {
    this.message = 'Searching Jobs...';
    this.careerFirstService
      .getJobs()
        .then(foundJobs => {
          this.message = foundJobs.length > 0 ? '' : 'No Jobs found';
          this.jobs = foundJobs;
        });
  }

}
