import {

  Routes

} from '@angular/router';

import {

  LoginComponent

} from './login/login.component';

import {

  SignupComponent

} from './signup/signup.component';

import {

  LayoutComponent

} from './layout/layout';

import {

  DashboardComponent

} from './dashboard/dashboard';

import {

  AddComponent

} from './add/add';

import {

  UsersComponent

} from './users/users';

import {

  authGuard

} from './guards/auth.guard';

export const routes: Routes = [

  // =========================
  // DEFAULT ROUTE
  // =========================

  {
    path: '',

    redirectTo: 'login',

    pathMatch: 'full'
  },

  // =========================
  // LOGIN
  // =========================

  {
    path: 'login',

    component: LoginComponent
  },

  // =========================
  // SIGNUP
  // =========================

  {
    path: 'signup',

    component: SignupComponent
  },

  // =========================
  // MAIN LAYOUT
  // =========================

  {
    path: 'app',

    component: LayoutComponent,

    // PROTECT ENTIRE APP

    canActivate: [
      authGuard
    ],

    children: [

      // =========================
      // DASHBOARD
      // =========================

      {
        path: 'dashboard',

        component:
          DashboardComponent
      },

      // =========================
      // ADD PAGE
      // =========================

      {
        path: 'add',

        component:
          AddComponent
      },

      // =========================
      // USERS PAGE
      // =========================

      {
        path: 'users',

        component:
          UsersComponent
      },

      // =========================
      // DEFAULT CHILD
      // =========================

      {
        path: '',

        redirectTo:
          'dashboard',

        pathMatch: 'full'
      }
    ]
  },

  // =========================
  // INVALID ROUTES
  // =========================

  {
    path: '**',

    redirectTo: 'login'
  }
];