import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupData = {
    username: '',
    password: '',
    email: '',
    phone: '',
    role: 'User'
  };

  constructor(private auth: AuthService) {}

  signup() {

    /* LOADING ALERT */

    Swal.fire({

      title: 'Please wait...',

      text: 'Creating account',

      allowOutsideClick: false,

      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.auth.signup(this.signupData)
      .subscribe({

        next: (res) => {

          Swal.close();

          Swal.fire({

            icon: 'success',

            title: 'Signup Successful',

            text:
              res.message ||
              'Account created successfully',

            confirmButtonColor: '#2563eb'
          });

          console.log(res);

          /* OPTIONAL RESET FORM */

          this.signupData = {

            username: '',
            password: '',
            email: '',
            phone: '',
            role: 'User'
          };
        },

        error: (err) => {

          Swal.close();

          Swal.fire({

            icon: 'error',

            title: 'Signup Failed',

            text:
              err?.error?.message ||
              'Something went wrong',

            confirmButtonColor: '#dc2626'
          });

          console.error(err);
        }
      });
  }
}