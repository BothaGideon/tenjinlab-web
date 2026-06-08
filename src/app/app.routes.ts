import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage),
  },
  {
    path: 'projects/otakutracker',
    loadComponent: () =>
      import('./pages/projects/otakutracker-page/otakutracker-page').then(m => m.OtakuTrackerPage),
  },
  { path: '**', redirectTo: 'home' },
];
