import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit {

  @Input() page: number = 1;
  @Input() perPage: number = 10;
  @Input() totalItems: number = 0;
  @Output() onPageChanged = new EventEmitter<number>();
  totalPages: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.calcTotalPages();
  }

  ngOnChanges() {
    this.calcTotalPages();
    if (this.page > this.totalPages) {
      this.page = 1;
    }
  }

  onPaginationClicked() {
    this.onPageChanged.emit(this.page);
  }

  onFirstClicked() {
    this.page = 1;
  }

  onLastClicked() {
    this.page = this.totalPages;
  }

  onPreviousClicked() {
    if (this.page > 1)
      this.page--;
  }

  onNextClicked() {
    if (this.page < this.totalPages)
      this.page++;
  }

  private calcTotalPages() {
    this.totalPages = this.totalItems ? Math.round(this.totalItems / this.perPage) : this.totalPages;
  }

}
