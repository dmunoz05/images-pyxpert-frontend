import { Component, OnInit, Output, Input, SimpleChanges, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SlibarComponent } from '../slibar/slibar.component';
import { LoginService, UserInfo } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PhotoResponse } from '../../types/image.type';
import { HomeService } from './home.service';
import { NgApexchartsModule } from "ng-apexcharts";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SlibarComponent, RouterLink, NgApexchartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  showPhoto = signal<boolean>(false);
  dataPhoto = {} as PhotoResponse;
  userInfo?: any
  basicChart: any;

  constructor(private loginService: LoginService, private http: HttpClient, private homeService: HomeService) { }

  ngOnInit() {
    //Obtener datos de usuario
    this.loginService.userProfileSubject.subscribe(info => {
      this.userInfo = info;
    })

    //Obtener foto seleccionada
    this.homeService.photoData.subscribe((photo) => {
      debugger
      this.showPhoto.set(true);
      this.dataPhoto = photo;
    });
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  ngOnChanges(changes: SimpleChanges) {
    debugger
    console.log(changes)
  }

  //Grafica
  public chartOptions: any = {
    series: [
      {
        name: 'Sales',
        data: [35, 70, 125]
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: [1991, 1992, 1993]
    },
    title: {
      text: 'Bar Chart',
      align: 'left'
    }
  };
  // @Input() title: ApexTitleSubtitle;
  // @Input() chart: ApexChart;
  // @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @Input() annotations: ApexAnnotations;
  // @Input() colors: string[];
  // @Input() dataLabels: ApexDataLabels;
  // @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @Input() stroke: ApexStroke;
  // @Input() labels: string[];
  // @Input() legend: ApexLegend;
  // @Input() fill: ApexFill;
  // @Input() tooltip: ApexTooltip;
  // @Input() plotOptions: ApexPlotOptions;
  // @Input() responsive: ApexResponsive[];
  // @Input() xaxis: ApexXAxis;
  // @Input() yaxis: ApexYAxis | ApexYAxis[];
  // @Input() grid: ApexGrid;
  // @Input() states: ApexStates;
  // @Input() title: ApexTitleSubtitle;
  // @Input() subtitle: ApexTitleSubtitle;
  // @Input() theme: ApexTheme;

  // options = {
  //   chart: {
  //     type: 'line'
  //   },
  //   series: [{
  //     name: 'sales',
  //     data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  //   }],
  //   xaxis: {
  //     categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  //   }
  // }
}
