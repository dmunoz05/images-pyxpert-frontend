import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FeatureComponent } from './feature/feature.component';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'begin',
    component: LayoutComponent,
    children: [
      { path: 'home', loadComponent: () => import('./../app/home/home.component').then(m => m.HomeComponent) },
      { path: 'feature', loadComponent: () => import('./../app/feature/feature.component').then(m => m.FeatureComponent)},
    ]
  },
];
