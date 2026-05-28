import { Component, input } from '@angular/core';
import { SortDirection, SortType } from '../../common/sort';

@Component({
  selector: 'th[app-sortable]',
  imports: [],
  templateUrl: './th-sortable.html',
})
export class ThSortable {
  currentSortDirection = input.required<SortDirection>();
  currentSortType = input.required<SortType>();
  sortType = input.required<SortType>();
  name = input.required<string>();
}
