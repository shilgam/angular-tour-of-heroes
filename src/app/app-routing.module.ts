import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from './dashboard/dashboard.component';
import HeroesComponent from './heroes/heroes.component';
import HeroDetailComponent from './hero-detail/hero-detail.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AComponent } from './a/a.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'formControl', component: NameEditorComponent },
  { path: 'formGroup', component: ProfileEditorComponent },
  { path: 'a', component: AComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export default class AppRoutingModule {}
