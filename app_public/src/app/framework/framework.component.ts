import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';  
import { User, UserShort } from '../user'; 
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  isAdmin !: boolean;
  constructor(private authenticationService: AuthenticationService,
    private historyService: HistoryService) { }

  ngOnInit() {
    this.IsUserAdmin();
  }

  public doLogout(): void {                                         
    this.authenticationService.logout();
  }

  public isLoggedIn(): boolean {                                    
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {                                    
    const user: UserShort = this.authenticationService.getCurrentUser();
    return user ? user.email : 'Guest';
  }

  public IsUserAdmin() {                                    
    const user: UserShort = this.authenticationService.getCurrentUser();
    if(user.role == 'admin')
    {
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
  }
}
