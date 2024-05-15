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
      { path: 'politice', loadComponent: () => import('./layouts/layout-politice/layout-politice.component').then(m => m.LayoutPoliticeComponent) },
      { path: 'ia', loadComponent: () => import('./layouts/layout-ia/layout-ia.component').then(m => m.LayoutIaComponent) },
      { path: 'model-pdc', loadComponent: () => import('./layouts/layout-model-pdc/layout-model-pdc.component').then(m => m.LayoutModelPdcComponent) },
      { path: 'model-color', loadComponent: () => import('./layouts/layout-model-color/layout-model-color.component').then(m => m.LayoutModelColorComponent) },
      { path: 'model-face', loadComponent: () => import('./layouts/layout-model-face/layout-model-face.component').then(m => m.LayoutModelFaceComponent) },
      { path: 'model-listening', loadComponent: () => import('./layouts/layout-model-listening/layout-model-listening/layout-model-listening.component').then(m => m.LayoutModelListeningComponent) },
      { path: 'qr', loadComponent: () => import('./layouts/layout-qr/layout-qr.component').then(m => m.LayoutQrComponent) },
    ]
  },
  {
    path: 'public',
    loadComponent: () => import('./layouts/layout-public/layout-public.component').then(m => m.LayoutPublicComponent),
    children: [
      { path: 'pricing', loadComponent: () => import('./layouts/layout-pricing/layout-pricing.component').then(m => m.LayoutPricingComponent) },
      { path: 'documentation', loadComponent: () => import('./layouts/layout-documentation/layout-documentation.component').then(m => m.LayoutDocumentationComponent) },
      { path: 'politice', loadComponent: () => import('./layouts/layout-politice/layout-politice.component').then(m => m.LayoutPoliticeComponent) },
    ]

  },
  //Ruta de error
  {
    path: '**',
    redirectTo: '',
  }
];
