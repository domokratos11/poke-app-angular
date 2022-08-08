import { Component, OnInit } from '@angular/core';
import { ConfigService, PokemonResult } from '../../config/config.service';

@Component({
  selector: 'poke-card-list',
  templateUrl: './poke-card-list.component.html',
  providers: [ConfigService],
})
export class PokeCardList implements OnInit {
  response: PokemonResult | undefined;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.getPokemons().subscribe((data: PokemonResult) => {
      this.response = { ...data };
    });
  }
}
