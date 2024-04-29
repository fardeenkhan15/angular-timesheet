import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterOutlet, 
            FormsModule,
            ReactiveFormsModule, 
            CommonModule,
            RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{

  title = "Reset your Password"

  forgotForm!: FormGroup

  constructor(private router:Router, private toast:ToastrService, private auth:AuthService) { }

  ngOnInit(): void {
    this.initializeFormGroup()
  }

  initializeFormGroup(){
    this.forgotForm = new FormGroup({
      email: new FormControl(null,[Validators.required]),
  })
  }
  
  // convenience getter for easy access to form fields
  get email(){
    return this.forgotForm.get('email')
  }

  onSubmit(){
    this.auth.forgotPassword(this.forgotForm.value).subscribe({
      next:(response)=>{
        
        console.log(response.toaster_success);
        this.router.navigate(['login']);

        this.toast.success('Success');
        
      },
      error: (msg)=>{
        this.router.navigate(['login']);
        this.toast.error(msg['error']["toaster_error"],'Error');
      }
    })
  }
}
