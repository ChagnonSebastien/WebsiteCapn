import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { ModalDirective } from 'ng-mdb-pro/free';

import { AuthenticationService } from './authentification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  @ViewChild('error')
  private errorModal: ModalDirective;

  @ViewChild('login')
  private loginModal: ModalDirective;

  public authenticated: boolean;
  private user: string;
  private authenticationListener: Subscription;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationListener = this.authenticationService.authentication().subscribe((authenticated: boolean) => {
      this.authenticated =  authenticated;
      this.user = this.authenticationService.getUser();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.authenticationListener.unsubscribe();
  }

  private showAuthentication(): void {
    this.loginModal.show();
  }

  public authenticate(user: string, password: string): void {
    this.authenticationService.authenticate(user, password)
      .then((success: boolean) => {
        if (success) {
          this.loginModal.hide();
        } else {
          this.errorModal.show();
        }
      })
      .catch((reason: any) => {
        this.errorModal.show();
      });
  }

}
