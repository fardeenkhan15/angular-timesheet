import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router, private auth:AuthService, private toast:ToastrService, private tokenService:TokenService) {}

  loggedout() {
    const token = localStorage.getItem('currentUserToken');
    console.log(token);
    
    // Check if token is not null
    if (token !== null) {
      // Here TypeScript knows that `token` is of type `string`
      this.auth.logout(token).subscribe(() => {
        this.tokenService.clearUserAndToken();
        this.toast.success("Logged out Successfully");
        this.router.navigateByUrl('login');
      }, (error) => {
        console.error("Error logging out:", error);
        // Handle error
      });
    } else {
      console.error("Token not found in local storage");
      // Handle case when token is not found in local storage
    }
  }
}
