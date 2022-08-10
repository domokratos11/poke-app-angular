import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'search-box',
  templateUrl: 'search-box.component.html',
})
export class SearchBox implements OnInit {
  LimitOptions: number[] = [];
  SelectedLimitOption: number;
  @Output() newSearchEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.LimitOptions = [20, 30, 40, 50, 100];
    this.SelectedLimitOption = this.LimitOptions[0];
  }

  OnLimitChange(value: any): void {
    this.SelectedLimitOption = value.target.value;
  }
  SearchPokemon(inputText: string): void {
    this.newSearchEvent.emit(`${inputText}|${this.SelectedLimitOption}`);
  }
}
