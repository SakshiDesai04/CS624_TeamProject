import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';                            
import { AuthenticationService } from '../authentication.service';   
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formError: string = '';                                    

  public UserDetails= {                                            
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'user',
    phoneNumber: 0,
    skills: '',
    experience: 0,
    currentTitle: ''    
  };

  public pageContent = {                                            
    header: {
      title: 'Create a new account',
      strapline: ''
    },
    sidebar: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
  }

  public onRegisterSubmit(): void {                                   
    this.formError = '';
    if (
      !this.UserDetails.firstName ||                          
      !this.UserDetails.lastName ||                                 
      !this.UserDetails.email ||
      !this.UserDetails.password ||                                   
      !this.UserDetails.role ||                                  
      !this.UserDetails.phoneNumber||
      !this.UserDetails.skills ||                                 
      !this.UserDetails.experience ||                                   
      !this.UserDetails.currentTitle                                       
    ) {
      this.formError = 'All fields are required, please try again';   
    } else {
      this.doRegister();
    }
  }

  private doRegister(): void {                                        
    this.authenticationService.register(this.UserDetails)
      .then(() => this.router.navigateByUrl('/'))
      .catch((message) => this.formError = message);
  }
}

