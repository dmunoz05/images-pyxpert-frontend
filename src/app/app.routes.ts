import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'begin',
    loadComponent: () => import('./layouts/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: 'home', loadComponent: () => import('./../app/home/home.component').then(m => m.HomeComponent) },
      // { path: 'feature', loadComponent: () => import('./../app/feature/feature.component').then(m => m.FeatureComponent)},
    ]
  },
  {
    path: 'become',
    loadComponent: () => import('./layouts/layout.component').then(m => m.LayoutComponent),
    children: [
      // { path: 'home', loadComponent: () => import('./../app/home/home.component').then(m => m.HomeComponent) },
      { path: 'feature', loadComponent: () => import('./../app/feature/feature.component').then(m => m.FeatureComponent)},
    ]
  },
  //Ruta de error
  {
    path: '**',
    redirectTo: '',
  }
];
