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
  limit: string;
  IdName: string;
  offSet: number = 0;
  resultArray: any;
  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.SearchPokemons();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['searchText'].firstChange && this.searchText) {
      const searchArray: string[] = this.searchText.split('|');
      if (searchArray.length == 1) this.limit = searchArray[0];
      else {
        this.IdName = searchArray[0];
        this.limit = searchArray[1];
      }

      if (this.IdName)
        this.searchText =
          this.configService.fetchPokemonURL + this.IdName.toLowerCase();
      else {
        this.searchText =
          this.configService.fetchPokemonURL +
          '?offset=' +
          this.offSet +
          '&limit=' +
          this.limit;
        this.configService
          .getNextPokemons(this.searchText || '')
          .subscribe((data: PokemonResult) => {
            this.response = { ...data };
            this.resultArray = [...data.results];
          });
      }
    }
  }
  SearchPokemons(): void {
    this.configService.getPokemons().subscribe((data: PokemonResult) => {
      this.response = { ...data };
      this.resultArray = [...data.results];
    });
  }
  LoadMore(replace: boolean): void {
    this.configService
      .getNextPokemons(this.response?.next || '')
      .subscribe((data: PokemonResult) => {
        this.response = { ...data };
        this.resultArray = replace
          ? [...data.results]
          : [...this.resultArray, ...data.results];
      });
  }
}
