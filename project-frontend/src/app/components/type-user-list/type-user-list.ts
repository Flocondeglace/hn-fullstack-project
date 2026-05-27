import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserListTypeService } from '../../services/user-list-type-service';
import { UserType } from '../../common/user-type';
import { ActivatedRoute, RouterLink } from '@angular/router';

export type SortType = 'id' | 'typeName';
export type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-type-user-list',
  imports: [RouterLink],
  templateUrl: './type-user-list.html',
  styleUrl: './type-user-list.scss',
})
export class TypeUserList implements OnInit {
  sortType: WritableSignal<SortType> = signal<SortType>('id');
  sortDirection: WritableSignal<SortDirection> = signal<SortDirection>('asc');
  userTypes: WritableSignal<UserType[]> = signal<UserType[]>([]);

  constructor(
    private userListTypeService: UserListTypeService,
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

  removeUserType(id: number): void {
    this.userListTypeService.removeUserType(id).subscribe((data) => {
      console.log(data);
      this.updateList();
    });
  }

  onSort(type: SortType) {
    if (this.sortType() === type) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortType.set(type);
      this.sortDirection.set('asc');
    }
    this.sortBy();
  }

  private sortBy() {
    console.log('Sorting by: ', this.sortType(), 'Direction: ', this.sortDirection());
    let sortedTypes = [...this.userTypes()];
    const direction = this.sortDirection() === 'asc' ? 1 : -1;
    if (this.sortType() === 'typeName') {
      sortedTypes.sort((a, b) => a.typeName!.localeCompare(b.typeName!) * direction);
    } else {
      sortedTypes.sort((a, b) => (a.id! - b.id!) * direction);
    }
    this.userTypes.set(sortedTypes);
    console.log('Sorted user types: ', this.userTypes());
  }
}
