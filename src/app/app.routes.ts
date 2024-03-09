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
      { path: 'home', loadComponent: () => import('./layouts/layout-home/layout-home.component').then(m => m.LayoutHomeComponent), pathMatch: 'full' },
      { path: 'feature', loadComponent: () => import('./layouts/layout-feature/layout-feature.component').then(m => m.LayoutFeatureComponent), pathMatch: 'full' },
      { path: 'pricing', loadComponent: () => import('./layouts/layout-pricing/layout-pricing.component').then(m => m.LayoutPricingComponent), pathMatch: 'full' },
      {path: 'documentation', loadComponent: () => import('./layouts/layout-documentation/layout-documentation.component').then(m => m.LayoutDocumentationComponent), pathMatch: 'full'},
    ]
  },
  //Ruta de error
  {
    path: '**',
    redirectTo: '',
  }
];
