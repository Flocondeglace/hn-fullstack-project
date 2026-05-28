import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserListTypeService } from '../../services/user-list-type-service';
import { UserType } from '../../common/user-type';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SortService } from '../../services/sort-service';
import { SortDirection, SortType } from '../../common/sort';
import { ThSortable } from '../th-sortable/th-sortable';

@Component({
  selector: 'app-type-user-list',
  imports: [RouterLink, ThSortable],
  templateUrl: './type-user-list.html',
  styleUrl: './type-user-list.scss',
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
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.updateList();

    this.route.params.subscribe((params) => {
      console.log('Route params: ', params);
      this.sortDirection.set(params['sortDirection'] || 'asc');
      this.sortType.set(params['sortType'] || 'id');
      this.sortBy();
    });
  }

  updateList(): void {
    this.userListTypeService.getTypeUserList().subscribe((data) => {
      console.log(data);
      this.userTypes.set(data);
    });
    this.sortBy();
  }

  getValue(userType: UserType, key: SortType): any {
    return userType[key as keyof UserType];
  }

  removeUserType(id: number): void {
    this.userListTypeService.removeUserType(id).subscribe((data) => {
      console.log(data);
      this.updateList();
    });
  }

  onSort(type: SortType) {
    const { sortType, sortDirection } = this.sortService.onSort(
      type,
      this.sortType(),
      this.sortDirection(),
    );
    this.sortType.set(sortType);
    this.sortDirection.set(sortDirection);
    this.sortBy();
  }

  private sortBy() {
    console.log('Sorting by: ', this.sortType(), 'Direction: ', this.sortDirection());
    this.userTypes.set(
      this.sortService.sortBy(this.sortType(), this.sortDirection(), this.userTypes()),
    );
  }
}
