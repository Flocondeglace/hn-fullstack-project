import { Injectable } from '@angular/core';
import { SortDirection, SortType, SortTypeEnum } from '../common/sort';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  // Return new sort type/direction based on previous ones and the column clicked
  updateSortParameters(
    type: SortType,
    currentSortType: SortType,
    currentSortDirection: SortDirection,
  ): { sortType: SortType; sortDirection: SortDirection } {
    let newSortDirection: SortDirection = 'asc';
    let newSortType: SortType = type;

    if (currentSortType === type) {
      newSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
    }

    return { sortType: newSortType, sortDirection: newSortDirection };
  }

  // Sort an array of User or UserType based on sort type and direction
  sortBy(sortType: SortType, sortDirection: SortDirection, toSort: any[]): any[] {
    console.info('Sorting by:', sortType, ', Direction: ', sortDirection);
    let sortedValues = [...toSort];
    const direction = sortDirection === 'asc' ? 1 : -1;
    Object.values(SortTypeEnum).forEach((t) => {
      if (sortType === t) {
        sortedValues.sort((a, b) => {
          const aValue = a[t as keyof (typeof toSort)[0]];
          const bValue = b[t as keyof (typeof toSort)[0]];
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue) * direction;
          } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            return (aValue - bValue) * direction;
          }
          return 0;
        });
      }
    });
    return sortedValues;
  }
}
