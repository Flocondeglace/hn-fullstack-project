import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserListService } from '../../services/user-list-service';
import { User } from '../../common/user';
import { UserListTypeService } from '../../services/user-list-type-service';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails implements OnInit {
  user: WritableSignal<User> = signal(new User());
  userTypeName: WritableSignal<string> = signal('');

  constructor(
    private route: ActivatedRoute,
    private userListService: UserListService,
    private userListTypeService: UserListTypeService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let userId = +params['id'] || 0;
      this.userListService.getUser(userId).subscribe((user) => {
        this.user.set(user);
        console.log('User details: ', user);
        this.userListTypeService.getUserType(user.userTypeId!).subscribe((userType) => {
          this.userTypeName.set(userType.typeName || '');
        });
      });
    });
  }
}
