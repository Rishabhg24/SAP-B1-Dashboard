import {

  CanActivateFn,

  Router

} from '@angular/router';

import {

  inject

} from '@angular/core';

export const authGuard:

CanActivateFn = () => {

  const router =
    inject(Router);

  // GET TOKEN

  const token =

    localStorage.getItem(
      'token'
    );

  // TOKEN EXISTS

  if (token) {

    return true;
  }

  // REDIRECT LOGIN

  router.navigate([
    '/login'
  ]);

  return false;
};