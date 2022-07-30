import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.less']
})
export class SearchbarComponent implements OnInit {

  @Input() searchStr: string = ""; 
  @Input() intervalTimeInSec: number = 500;
  @Input() shouldBeDisabled: boolean = false;
  @Output() searchStrChanged = new EventEmitter<string>();

  timerId: any = null;
  placeholder: string = "Search...";

  constructor() { }

  ngOnInit(): void {
  }

  onChange(e: Event) {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.timerId = setTimeout(() => { 
      this.searchStrChanged.emit((e?.target as HTMLInputElement).value);
    }, this.intervalTimeInSec);
  }

}
