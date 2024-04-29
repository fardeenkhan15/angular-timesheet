import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { AuthGuardService } from '../../../services/auth-guard.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    HeaderComponent,
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  title = "Login into your account"
  user ?: any;
  token ?: any;
  // public time!:any  

  @Output() userEmitter = new EventEmitter<any>(); 

  loginForm!: FormGroup ;

  constructor(private router: Router, private auth: AuthService, private toast:ToastrService, private http:HttpClient, private tokenService:TokenService, private authGuardService:AuthGuardService) { }

  ngOnInit():void{
    this.initializeFormGroup();
    // localStorage.clear();
  }

  initializeFormGroup(){
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  // convenience getter for easy access to form fields
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }

  login(){
    return this.auth.login(this.loginForm.value).subscribe((res)=>{
      if(res.status === 200){
        console.log(res.user);
        console.log(res.token);
        this.user = res.user;
        this.token = res.token;
        // this.userEmitter.emit(this.user);
        this.toast.success("Logged in Successfully")
        this.tokenService.setUserAndToken(this.user, this.token);
        this.router.navigateByUrl('timesheet');
      }
      else{
        this.toast.error("Invalid Email/Password");
      }
    })
  }

}