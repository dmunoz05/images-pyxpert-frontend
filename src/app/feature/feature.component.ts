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
    console.log(data);
    const { area, perimeter, ellipticity, circularity, center_x, center_y, Hu_moments, Height, Width } = data

    this.chartOptionsAreaPerimeter = {
      series: [
        {
          data: [area, perimeter]
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
        categories: ['area', 'perimeter']
      },
      title: {
        text: 'Area and Perimeter',
        align: 'left'
      }
    }

    this.chartOptionsEllipticityCircularity = {
      series: [
        {
          data: [ellipticity, circularity]
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
        categories: ['ellipticity', 'circularity']
      },
      title: {
        text: 'Ellipticity and Circularity',
        align: 'left'
      }
    }

    this.chartOptionsCenterXCenterY = {
      series: [
        {
          data: [center_x, center_y]
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
        categories: ['center_x', 'center_y']
      },
      title: {
        text: 'Center_x and Center_y',
        align: 'left'
      }
    }

    this.chartOptionsHuMoments = {
      series: [
        {
          data: Hu_moments[0]
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
        categories: Hu_moments[0]
      },
      title: {
        text: 'Hu_moments',
        align: 'left'
      }
    }

    this.chartOptionsShapes = {
      series: [
        {
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
      title: {
        text: 'Height and Width',
        align: 'left'
      }
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
