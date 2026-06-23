import {

  HttpInterceptorFn

} from '@angular/common/http';

export const jwtInterceptor:

HttpInterceptorFn =

(req, next) => {

  // GET TOKEN

  const token =

    localStorage.getItem(
      'token'
    );

  // ADD TOKEN

  if (token) {

    req = req.clone({

      setHeaders: {

        Authorization:
          `Bearer ${token}`
      }
    });
  }

  return next(req);
};