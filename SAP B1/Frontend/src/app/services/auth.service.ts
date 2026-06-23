import {

  Injectable

} from '@angular/core';

import {

  HttpClient,

  HttpHeaders

} from '@angular/common/http';

import {

  Observable

} from 'rxjs';

@Injectable({

  providedIn: 'root'
})

export class AuthService {

  // =========================
  // API URL
  // =========================

  private apiUrl =

    'https://localhost:7152/api/Auth';

  // =========================
  // HEADERS
  // =========================

  private headers = {

    headers: new HttpHeaders({

      'Content-Type':
        'application/json'
    })
  };

  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(

    private http: HttpClient
  ) {}

  // =========================
  // LOGIN
  // =========================

  login(data: any):

  Observable<any> {

    return this.http.post(

      `${this.apiUrl}/login`,

      data,

      this.headers
    );
  }

  // =========================
  // SIGNUP
  // =========================

  signup(data: any):

  Observable<any> {

    return this.http.post(

      `${this.apiUrl}/signup`,

      data,

      this.headers
    );
  }

  // =========================
  // GET USERS
  // =========================

  getUsers():

  Observable<any> {

    return this.http.get(

      `${this.apiUrl}/users`
    );
  }

  // =========================
  // LOGOUT
  // =========================

  logout():

  Observable<any> {

    // REMOVE TOKEN

    localStorage.removeItem(
      'token'
    );

    // REMOVE USERNAME

    localStorage.removeItem(
      'username'
    );

    return this.http.post(

      `${this.apiUrl}/logout`,

      {},

      this.headers
    );
  }

  // =========================
  // SAVE TOKEN
  // =========================

  saveToken(token: string): void {

    localStorage.setItem(

      'token',

      token
    );
  }

  // =========================
  // GET TOKEN
  // =========================

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );
  }

  // =========================
  // CHECK LOGIN
  // =========================

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );
  }
}