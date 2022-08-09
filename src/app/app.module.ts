import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokeCard } from './components/poke-card/poke-card.component';
import { PokeCardList } from './components/poke-card/poke-card-list.component';
import { SearchBox } from './components/poke-card/search-box.component';
import { PokeCardNotFound } from './components/poke-card/poke-card-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PokeCard,
    PokeCardList,
    SearchBox,
    PokeCardNotFound,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
