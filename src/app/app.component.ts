import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  searchText?: string;

  doSearch(searchText: string): void {
    this.searchText = searchText;
  }

  scrollTop(): void {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  scrollDown(): void {
    let scrollToDown = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos <= document.body.scrollHeight - 1000) {
        window.scrollTo(0, pos + 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToDown);
      }
    }, 16);
  }
}
