import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserListTypeService } from '../../services/user-list-type-service';
import { UserType } from '../../common/user-type';
import { RouterLink } from '@angular/router';
import { SortService } from '../../services/sort-service';
import { SortDirection, SortType } from '../../common/sort';
import { ThSortable } from '../th-sortable/th-sortable';

@Component({
  selector: 'app-type-user-list',
  imports: [RouterLink, ThSortable],
  templateUrl: './type-user-list.html',
})
export class TypeUserList implements OnInit {
  sortType: WritableSignal<SortType> = signal<SortType>('id');
  sortDirection: WritableSignal<SortDirection> = signal<SortDirection>('asc');
  userTypes: WritableSignal<UserType[]> = signal<UserType[]>([]);
  cols_values: SortType[] = ['id', 'typeName'];
  cols_names: string[] = ['ID', 'User Type'];

  constructor(
    private userListTypeService: UserListTypeService,
    private sortService: SortService,
  ) {}

  ngOnInit(): void {
    this.updateList();
  }

  updateList(): void {
    this.userListTypeService.getTypeUserList().subscribe((data) => {
      console.info('Retrieved user types: ', data);
      this.userTypes.set(data);

      this.sortBy();
    });
  }

  getValue(userType: UserType, key: SortType): any {
    return userType[key as keyof UserType];
  }

  removeUserType(id: number): void {
    this.userListTypeService.removeUserType(id).subscribe(() => {
      console.info('User type removed successfully: ', id);
      this.updateList();
    });
  }

  onSort(type: SortType) {
    const { sortType, sortDirection } = this.sortService.updateSortParameters(
      type,
      this.sortType(),
      this.sortDirection(),
    );
    this.sortType.set(sortType);
    this.sortDirection.set(sortDirection);
    this.sortBy();
  }

  private sortBy() {
    this.userTypes.set(
      this.sortService.sortBy(this.sortType(), this.sortDirection(), this.userTypes()),
    );
  }
}
