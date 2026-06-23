import {

  Component

} from '@angular/core';

import {

  FormsModule

} from '@angular/forms';

import {

  CommonModule

} from '@angular/common';

import {

  AuthService

} from '../services/auth.service';

import {

  Router,

  RouterLink

} from '@angular/router';

import Swal from 'sweetalert2';

@Component({

  selector: 'app-login',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule,

    RouterLink
  ],

  templateUrl:
    './login.component.html',

  styleUrls: [
    './login.component.css'
  ]
})

export class LoginComponent {

  // =========================
  // LOGIN DATA
  // =========================

  loginData = {

    username: '',

    password: ''
  };

  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(

    private auth: AuthService,

    private router: Router
  ) {}

  // =========================
  // LOGIN
  // =========================

  login() {

    // =========================
    // LOADING ALERT
    // =========================

    Swal.fire({

      title: 'Please wait...',

      text: 'Logging in',

      allowOutsideClick: false,

      didOpen: () => {

        Swal.showLoading();
      }
    });

    // =========================
    // API CALL
    // =========================

    this.auth.login(

      this.loginData

    )

    .subscribe({

      // =========================
      // SUCCESS
      // =========================

      next: (res: any) => {

        // CLOSE LOADER

        Swal.close();

        // =========================
        // SAVE JWT TOKEN
        // =========================

        this.auth.saveToken(

          res.token
        );

        // =========================
        // SAVE USERNAME
        // =========================

        localStorage.setItem(

          'username',

          this.loginData.username
        );

        // =========================
        // SUCCESS ALERT
        // =========================

        Swal.fire({

          icon: 'success',

          title: 'Login Successful',

          text: 'Welcome back!',

          timer: 1500,

          showConfirmButton: false
        });

        // =========================
        // DEBUG RESPONSE
        // =========================

        console.log(res);

        // =========================
        // REDIRECT
        // =========================

        this.router.navigate([

          '/app/dashboard'
        ]);
      },

      // =========================
      // ERROR
      // =========================

      error: (err) => {

        // CLOSE LOADER

        Swal.close();

        // ERROR ALERT

        Swal.fire({

          icon: 'error',

          title: 'Login Failed',

          text:

            err?.error?.message

            ||

            'Invalid username or password',

          confirmButtonColor:
            '#dc2626'
        });

        console.error(err);
      }
    });
  }
}