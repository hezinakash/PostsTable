import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import iColumnData from 'src/app/interfaces/column-data-interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() columns: iColumnData[] = [];
  @Input() noDataMsg: string = "No data avialable yet...";
  @Input() page: number = 1;
  @Output() onPageNumberChanged = new EventEmitter<number>();
  itemsToDisplay: any[] = [];
  perPage: number = 10;

  constructor() { }

  ngOnInit(): void {
    this.displayItemsByPage();
  }

  ngOnChanges() {  
    this.displayItemsByPage();
  }

  onPageChanged(page: number) {
    this.page = page;
    this.displayItemsByPage();
    this.onPageNumberChanged.emit(page);
  }

  displayItemsByPage(){
    const fromIndex = (this.page - 1) * this.perPage;
    const toIndex = this.page * this.perPage;

    this.itemsToDisplay = this.items.slice(fromIndex, toIndex);
  }
}
