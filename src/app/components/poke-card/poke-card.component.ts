import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ConfigService, PokemonInfo } from '../../config/config.service';

@Component({
  selector: 'poke-card',
  templateUrl: './poke-card.component.html',
  providers: [ConfigService],
  encapsulation: ViewEncapsulation.None,
})
export class PokeCard implements OnInit, OnChanges, AfterViewInit {
  @Input()
  pokeUrl: string;
  pokeInfo: PokemonInfo;
  primaryType: string;
  secondaryType: string;
  backgroundColor: string;
  pokeImage: string;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.configService
      .getPokemon(this.pokeUrl)
      .subscribe((data: PokemonInfo) => {
        this.pokeInfo = { ...data };
        this.primaryType = this.getTypeClass(
          this.pokeInfo.types[0].type.name,
          true
        );

        this.pokeImage =
          this.pokeInfo.sprites.other['official-artwork'].front_default;
        this.secondaryType =
          this.pokeInfo.types.length == 2
            ? this.getTypeClass(this.pokeInfo.types[1].type.name, true)
            : '';
        this.backgroundColor = this.getTypeClass(
          this.pokeInfo.types[0].type.name,
          false
        );
      });
  }

  getTypeClass(type: string, isBorder: boolean): string {
    var types = {
      normal: !isBorder ? 'bg-normal' : 'bg-normal-border',
      fighting: !isBorder ? 'bg-fighting' : 'bg-fighting-border',
      flying: !isBorder ? 'bg-flying' : 'bg-flying-border',
      poison: !isBorder ? 'bg-poison' : 'bg-poison-border',
      ground: !isBorder ? 'bg-ground' : 'bg-ground-border',
      rock: !isBorder ? 'bg-rock' : 'bg-rock-border',
      bug: !isBorder ? 'bg-bug' : 'bg-bug-border',
      ghost: !isBorder ? 'bg-ghost' : 'bg-ghost-border',
      steel: !isBorder ? 'bg-steel' : 'bg-steel-border',
      fire: !isBorder ? 'bg-fire' : 'bg-fire-border',
      water: !isBorder ? 'bg-water' : 'bg-water-border',
      grass: !isBorder ? 'bg-grass' : 'bg-grass-border',
      electric: !isBorder ? 'bg-electric' : 'bg-electric-border',
      psychic: !isBorder ? 'bg-psychic' : 'bg-psychic-border',
      ice: !isBorder ? 'bg-ice' : 'bg-ice-border',
      dragon: !isBorder ? 'bg-dragon' : 'bg-dragon-border',
      dark: !isBorder ? 'bg-dark' : 'bg-dark-border',
      fairy: !isBorder ? 'bg-fairy' : 'bg-fairy-border',
    };
    return types[type as keyof typeof types] || types['normal'];
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {}
}
