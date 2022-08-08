import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  searchText?: string;

  doSearch(searchText: string): void {
    this.searchText = searchText;
  }
}
