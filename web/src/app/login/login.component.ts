import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  cookieValue!:string;
 errorMessage:string=''
  loginFrom !: FormGroup;
  constructor( private fb:FormBuilder,private auth:AuthService,private router: Router,private cookieService:CookieService) { }
  ngOnInit(){
    this.loginFrom=this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', Validators.required]
    })
  }

  handleSubmit(){
      this.errorMessage='';
      this.auth.login(this.loginFrom.value.email,this.loginFrom.value.password).subscribe((res)=>{
        console.log(res)
        if (res.email) {
            this.router.navigateByUrl('/');
        }
      },(err)=>{
             this.errorMessage=err.error.message;
      })
      
  }

}
