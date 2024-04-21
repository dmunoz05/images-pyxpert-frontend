import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { userInfo } from '../../types/user-info.type';
import { HomeService } from '../home/home.service';
import { RouterLink, Router } from '@angular/router';
import { NgApexchartsModule } from "ng-apexcharts"

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, RouterLink, NgApexchartsModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router) { }

  @Input() userInfo!: userInfo

  image: any;
  showImage = signal<boolean>(false)
  showCharacteristics = signal<boolean>(false)
  characteristics: any[] | undefined;
  public chartOptionsAreaPerimeter: any;
  public chartOptionsEllipticityCircularity: any;
  public chartOptionsCenterXCenterY: any;
  public chartOptionsHuMoments: any;
  public chartOptionsShapes: any;

  ngOnInit(): void {
    this.loadImageProcesed()
  }

  asignValuesCharacteristics(data: any) {
    const { area, perimeter, ellipticity, circularity, center_x, center_y, Hu_moments, Height, Width } = data

    this.chartOptionsAreaPerimeter = {
      series: [
        {
          name: 'Valor',
          data: [area, perimeter]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      theme: {
        mode: 'dark'
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [['area'], ['perimeter']]
      }
    }

    this.chartOptionsEllipticityCircularity = {
      series: [ellipticity, circularity],
      labels: ['Ellipticity', 'Circularity'],
      chart: {
        type: 'donut',
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
          },
        },
      },
      dataLabels: {
        enabled: false
      },
      theme: {
        mode: 'dark'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    };


    this.chartOptionsCenterXCenterY = {
      series: [{
        name: 'Valor',
        data: [center_x, center_y]
      }],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      theme: {
        mode: 'dark'
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: ['center_x', 'center_y'],
      },
    }

    this.chartOptionsHuMoments = {
      series: [
        {
          name: "Hu Momment 1",
          data: [[ Hu_moments[0][0], Hu_moments[0][0]]]
        },
        {
          name: "Hu Momment 2",
          data: [[ Hu_moments[0][1], Hu_moments[0][1]]]
        },
        {
          name: "Hu Momment 3",
          data: [[ Hu_moments[0][2], Hu_moments[0][2]]]
        },
        {
          name: "Hu Momment 4",
          data: [[ Hu_moments[0][3], Hu_moments[0][3]]]
        }
        ,
        {
          name: "Hu Momment 5",
          data: [[ Hu_moments[0][4], Hu_moments[0][4]]]
        },
        {
          name: "Hu Momment 6",
          data: [[ Hu_moments[0][5], Hu_moments[0][5]]]
        },
        {
          name: "Hu Momment 7",
          data: [[ Hu_moments[0][6], Hu_moments[0][6]]]
        }
      ],
      chart: {
        height: 350,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val: string) {
            return parseFloat(val).toFixed(1)
          }
        }
      },
      yaxis: {
        tickAmount: 7
      },
      theme: {
        mode: 'dark'
      },
      stroke: {
        curve: 'smooth'
      },

    }

    this.chartOptionsShapes = {
      series: [
        {
          name: 'Valor',
          data: [Height, Width]
        }
      ],
      chart: {
        type: 'area',
        height: 350,
      },
      theme: {
        mode: 'dark'
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Height', 'Width']
      },
    }

  }

  loadImageProcesed() {
    this.image = this.homeService.imageResponseProcess
    this.characteristics = this.homeService.characteristicsResponseProcess
    if (this.image !== undefined && this.characteristics.length === 0) {
      this.showImage.set(true)
    }
    if (this.characteristics.length > 0 && this.characteristics !== undefined) {
      this.showCharacteristics.set(true)
      this.asignValuesCharacteristics(this.characteristics[0])
    }
  }
}
