import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-box',
  templateUrl: 'search-box.component.html',
})
export class SearchBox {
  @Output() newSearchEvent = new EventEmitter<string>();

  SearchPokemon(inputText: string): void {
    this.newSearchEvent.emit(inputText);
  }
}
