import { Component, input } from '@angular/core';
import { SortDirection, SortType } from '../../common/sort';

@Component({
  selector: 'th[app-sortable]',
  imports: [],
  templateUrl: './th-sortable.html',
})
export class ThSortable {
  // Current SortDirection used to sort the table ('asc' or 'desc')
  currentSortDirection = input.required<SortDirection>();

  // Current SortType used to sort the table (properties of User or UserType)
  currentSortType = input.required<SortType>();

  // SortType associated with the column (properties of User or UserType)
  sortType = input.required<SortType>();

  // Name of the column
  name = input.required<string>();
}
