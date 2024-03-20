import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  {
    path: 'begin',
    loadComponent: () => import('./layouts/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: 'home', loadComponent: () => import('./layouts/layout-home/layout-home.component').then(m => m.LayoutHomeComponent) },
      { path: 'feature', loadComponent: () => import('./layouts/layout-feature/layout-feature.component').then(m => m.LayoutFeatureComponent) },
      { path: 'pricing', loadComponent: () => import('./layouts/layout-pricing/layout-pricing.component').then(m => m.LayoutPricingComponent) },
      { path: 'documentation', loadComponent: () => import('./layouts/layout-documentation/layout-documentation.component').then(m => m.LayoutDocumentationComponent) },
      { path: 'politice', loadComponent: () => import('./layouts/layout-politice/layout-politice.component').then(m => m.LayoutPoliticeComponent)},
    ]
  },
  //Ruta de error
  {
    path: '**',
    redirectTo: '',
  }
];
