import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from './dashboard/dashboard.component';
import HeroesComponent from './heroes/heroes.component';
import HeroDetailComponent from './hero-detail/hero-detail.component';
import { NameEditorComponent } from './name-editor/name-editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'reactiveForm', component: NameEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export default class AppRoutingModule {}
