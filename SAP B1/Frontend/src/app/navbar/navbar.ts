import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router
} from '@angular/router';

import Swal from 'sweetalert2';

import {
  AuthService
} from '../services/auth.service';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './navbar.html',

  styleUrls: ['./navbar.css']
})

export class NavbarComponent
implements OnInit {

  // =========================
  // USERNAME
  // =========================

  username = '';

  // =========================
  // LOADER
  // =========================

  isLoggingOut = false;

  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(

    private auth: AuthService,

    private router: Router

  ) {}

  // =========================
  // PAGE LOAD
  // =========================

  ngOnInit(): void {

    // GET USERNAME FROM LOCAL STORAGE

    this.username =
      localStorage.getItem(
        'username'
      ) || 'Admin User';
  }

  // =========================
  // LOGOUT
  // =========================

  logout() {

  Swal.fire({

    title: 'Logout?',

    text: 'Do you want to logout?',

    icon: 'question',

    showCancelButton: true,

    confirmButtonColor: '#2563eb',

    cancelButtonColor: '#dc2626',

    confirmButtonText: 'Yes, Logout'
  })

  .then((result) => {

    // =========================
    // USER CONFIRMED
    // =========================

    if (result.isConfirmed) {

      // START LOADER

      this.isLoggingOut = true;

      // =========================
      // CALL LOGOUT API
      // =========================

      this.auth.logout()

      .subscribe({

        // =========================
        // SUCCESS
        // =========================

        next: (res: any) => {

          // STOP LOADER

          this.isLoggingOut = false;

          // =========================
          // REMOVE JWT TOKEN
          // =========================

          localStorage.removeItem(
            'token'
          );

          // REMOVE USERNAME

          localStorage.removeItem(
            'username'
          );

          // =========================
          // SUCCESS ALERT
          // =========================

          Swal.fire({

            icon: 'success',

            title: 'Logged Out',

            text:

              res.message ||

              'Logout Successful',

            timer: 1500,

            showConfirmButton: false
          })

          // =========================
          // REDIRECT
          // =========================

          .then(() => {

            this.router.navigate([

              '/login'
            ]);
          });
        },

        // =========================
        // ERROR
        // =========================

        error: (err) => {

          // STOP LOADER

          this.isLoggingOut = false;

          // =========================
          // REMOVE TOKEN ANYWAY
          // =========================

          localStorage.removeItem(
            'token'
          );

          localStorage.removeItem(
            'username'
          );

          // ALERT

          Swal.fire({

            icon: 'error',

            title: 'Logout Failed',

            text:

              err?.error?.message

              ||

              'Session ended'
          });

          console.error(err);

          // REDIRECT LOGIN

          this.router.navigate([

            '/login'
          ]);
        }
      });
    }
  });
}}