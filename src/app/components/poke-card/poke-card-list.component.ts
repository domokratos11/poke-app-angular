import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ConfigService, PokemonResult } from '../../config/config.service';

@Component({
  selector: 'poke-card-list',
  templateUrl: './poke-card-list.component.html',
  providers: [ConfigService],
})
export class PokeCardList implements OnInit, OnChanges {
  response: PokemonResult | undefined;
  @Input() searchText?: string;
  resultArray: any;
  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.SearchPokemons();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['searchText'].firstChange && this.searchText) {
      this.searchText =
        this.configService.fetchPokemonURL + this.searchText?.toLowerCase();
    }
  }
  SearchPokemons(): void {
    this.configService.getPokemons().subscribe((data: PokemonResult) => {
      this.response = { ...data };
      this.resultArray = [...data.results];
    });
  }
  LoadMore(): void {
    this.configService
      .getNextPokemons(this.response?.next || '')
      .subscribe((data: PokemonResult) => {
        this.response = { ...data };
        this.resultArray = [...data.results];
      });
  }
  LoadWithoutReplace(): void {
    this.configService
      .getNextPokemons(this.response?.next || '')
      .subscribe((data: PokemonResult) => {
        this.response = { ...data };
        this.resultArray = [...this.resultArray, ...data.results];
      });
  }
}
