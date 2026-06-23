import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuthService }
from '../services/auth.service';

import {
  ChangeDetectorRef
} from '@angular/core';


@Component({

  selector: 'app-users',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './users.html',

  styleUrls: ['./users.css']
})

export class UsersComponent {

  users: any[] = [];

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {

    this.loadUsers();
  }

  loadUsers() {

    this.auth.getUsers()
      .subscribe({

        next: (res) => {

          console.log(res);

          this.users = res;
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);
        }
      });
  }
}