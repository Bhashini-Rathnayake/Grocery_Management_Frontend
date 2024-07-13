import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm : FormGroup;

  constructor(private authService : AuthService,
              private router: Router,
              private formBuilder:FormBuilder) {}


  ngOnInit(): void {
    this.authService.loginStatus.subscribe((loginStatus) =>{
      if (loginStatus){
        this.router.navigate(['/admin/dashboard']);
        sessionStorage.setItem('userDetails',JSON.stringify(loginStatus))
      } else {
        alert("Authentication Fail")
        // console.log("Authentication Fail")
      }
    });

    this.loginForm= this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }



  onLogin(){
    // console.log("click")
    // this.authService.login(false);
    let data = this.loginForm.getRawValue();

    // console.log("data", data)
    this.authService.login(data);

    // if(data.username == 'admin' && data.password == 'password'){
    //    this.authService.login(true);
    // } else {
    //   this.authService.login(false);
    // }


  }

  isValid(){
    return this.loginForm.valid;
  }

}
