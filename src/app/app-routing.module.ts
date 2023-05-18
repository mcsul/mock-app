import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./start/start.module').then((m) => m.StartPageModule),
    // import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'start',
    loadChildren: () =>
      import('./start/start.module').then((m) => m.StartPageModule),
    // import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'tab1', ///:username
    loadChildren: () =>
      import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
    // import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
