import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserListService } from '../../services/user-list-service';
import { User } from '../../common/user';
import { UserListTypeService } from '../../services/user-list-type-service';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
})
export class UserDetails implements OnInit {
  user: WritableSignal<User> = signal(new User());

  constructor(
    private route: ActivatedRoute,
    private userListService: UserListService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let userId = +params['id'] || 0;
      this.userListService.getUser(userId).subscribe((user) => {
        this.user.set(user);
        console.info('User details: ', user);
      });
    });
  }
}
