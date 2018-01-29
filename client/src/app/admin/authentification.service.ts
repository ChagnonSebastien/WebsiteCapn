import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SERVER_URL, SERVER_PORT } from '../config';

@Injectable()
export class AuthenticationService {

  private authenticated: BehaviorSubject<boolean>;

  private token: string;

  private user: string;

  constructor(private http: Http) {
    this.authenticated = new BehaviorSubject<boolean>(false);
  }

  public authentication(): BehaviorSubject<boolean> {
    return this.authenticated;
  }

  public getUser(): string {
    return this.user;
  }

  public getToken(): string {
    return this.token;
  }

  public authenticate(user: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .post(`https://${SERVER_URL}:${SERVER_PORT}/login`, {'user': user, 'password': password})
        .toPromise()
        .then((response: Response) => {
          if (response.json().success) {
            this.user = user;
            this.token = response.json().token;
            this.authenticated.next(true);
            resolve(true);
          } else {
            this.authenticated.next(false);
            reject('Token id not valid');
            resolve(false);
          }
        })
        .catch((reason: any) => {
          reject(reason);
          resolve(false);
        });
    });
  }

  public logOut(): void {
    this.authenticated.next(false);
  }
}
