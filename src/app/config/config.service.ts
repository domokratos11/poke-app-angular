import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface PokemonResult {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}

export interface PokemonInfo {
  id: number;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

@Injectable()
export class ConfigService {
  fetchPokemonURL = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get<PokemonResult>(this.fetchPokemonURL);
  }
  getPokemon(endpoint: string) {
    return this.http.get<PokemonInfo>(endpoint);
  }
  getPokemonByIdName(text: string) {
    return this.http.get<PokemonInfo>(`${this.fetchPokemonURL}${text}`);
  }
}
