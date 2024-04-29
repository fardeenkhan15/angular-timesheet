import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { OnboardImageComponent } from '../onboard-image/onboard-image.component';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,OnboardImageComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private toastr:ToastrService){}

  ngOnInit(){
    // this.toastr.clear();
  }

}
