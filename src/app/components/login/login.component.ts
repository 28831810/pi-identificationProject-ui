import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LoginStatus } from 'src/app/enums/login-status.enum';
import { SignupStatus } from 'src/app/enums/signup-status.enum';
import { Credential } from 'src/app/models/credential.model';
import { LoginResponse } from 'src/app/models/login-response.model';
import { SignupResponse } from 'src/app/models/signup-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,private service: ApiService) { }

  ngOnInit(): void {
  }

  onLogin(){
    const credential: Credential = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }

    this.service.login(credential).subscribe((response: LoginResponse) => {
      if(response.status === LoginStatus.Successful)
      {
        this.router.navigateByUrl('/home');
      }
      else
      {
        alert('Incorrect username and/or password');
      }
    },
    (error: HttpErrorResponse) => {
      // Show error
    })
  }

  onRegister(){
    this.service.register(this.getCredential()).subscribe((response: SignupResponse) => {
      if(response.status === SignupStatus.Success)
      {
        alert('Registered successfully - Please login to continue');
      }
      else
      {
        alert('Incorrect username and/or password');
      }
    },
    (error: HttpErrorResponse) => {
      // Show error
    });
  }

  getCredential(): Credential {
    const credential: Credential = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }

    return credential;
  }

  clearForm(){
    this.loginForm.controls.username.setValue('');
    this.loginForm.controls.password.setValue('');
  }
}