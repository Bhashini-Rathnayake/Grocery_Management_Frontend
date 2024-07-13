import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit{
  userDetails: any= {};

  constructor(private router: Router){}

  ngOnInit(): void {
    let user = sessionStorage.getItem('userDetails');

    if (user != null){
      this.userDetails =JSON.parse(user);
      // this.userDetails = JSON.parse(sessionStorage.getItem('user') || '{}');
    }


    // @ts-ignore
    // console.log("user", JSON.parse(user));
  }


  logOut(){
    this.router.navigate(['/login']);
    sessionStorage.removeItem('userDetails')
  }

}
