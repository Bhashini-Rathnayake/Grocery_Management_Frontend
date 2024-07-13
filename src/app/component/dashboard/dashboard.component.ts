import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{


  dashboardValues : any;

  constructor(private dashboardService : DashboardService,
              private router :Router,
  ){}

  ngOnInit(): void {
    // this.dashboardService.getValues();
    this.dashboardService.dashboardValues

      .subscribe((values) =>{
        // console.log("values in dashboard",values);
        if (values){
          this.dashboardValues = values;
        }
      })

  }

  getValues(){
    this.dashboardService.getValues();
  }

}
