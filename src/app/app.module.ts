import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import InMemoryDataService from './in-memory-data.service';

import AppRoutingModule from './app-routing.module';

import AppComponent from './app.component';
import DashboardComponent from './dashboard/dashboard.component';
import HeroDetailComponent from './hero-detail/hero-detail.component';
import HeroesComponent from './heroes/heroes.component';
import HeroSearchComponent from './hero-search/hero-search.component';
import MessagesComponent from './messages/messages.component';
import DashboardHeroComponent from './dashboard-hero/dashboard-hero.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { AddressComponent } from './address/address.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardHeroComponent,
    DashboardComponent,
    HeroSearchComponent,
    NameEditorComponent,
    ProfileEditorComponent,
    AddressComponent,
    AComponent,
    BComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export default class AppModule {}
