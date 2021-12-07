import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Jobs, Location, UserJobHistory} from './jobs';
import { environment } from '../environments/environment';
import { User, UserShort } from './user';                                 
import { AuthResponse } from './authresponse'; 
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class CareerFirstService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { }

  private apiBaseUrl = environment.apiBaseUrl;

  public UpdateUserJobHistory(UID: string, userHistory: UserJobHistory): Promise<any> {
    const url: string = `${this.apiBaseUrl}/user/${UID}`;
    const httpOptions = {                                                  
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };
    return this.http
      .put(url, userHistory, httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  public InsertJobDetails(job: Jobs): Promise<any> {
    const url: string = `${this.apiBaseUrl}/jobs`;
    const httpOptions = {                                                  
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };
    return this.http
      .post(url, job, httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  public deleteJob(jobID: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/jobs/${jobID}`;
    const httpOptions = {                                                  
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };
    return this.http
      .delete(url,httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  public updateJob(job: Jobs, jobID: string): Promise<any> {
    const url: string = `${this.apiBaseUrl}/jobs/${jobID}`;
    const httpOptions = {                                                  
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };
    return this.http
      .put(url, job,httpOptions)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  public getJobs(): Promise<Jobs[]> {
    const url: string = `${this.apiBaseUrl}/jobs`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Jobs[])
      .catch(this.handleError);
  }

  public getJobsbyUserID(userID: string): Promise<UserJobHistory[]> {
    const url: string = `${this.apiBaseUrl}/user/${userID}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as UserJobHistory[])
      .catch(this.handleError);
  }

  public getJobByJobID(jobID: string): Promise<Jobs> {         
    const url: string = `${this.apiBaseUrl}/jobs/${jobID}`;     
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Jobs)                             
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: UserShort): Promise<AuthResponse> {            
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {         
    return this.makeAuthApiCallForRegister('user', user);
  }

  private makeAuthApiCall(urlPath: string, user: UserShort):
  Promise<AuthResponse> {                                    
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)                                        
      .toPromise()                                             
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private makeAuthApiCallForRegister(urlPath: string, user: User):
  Promise<AuthResponse> {                                    
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)                                        
      .toPromise()                                             
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

}