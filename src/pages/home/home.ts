import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {Storage} from "@ionic/storage";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  TOKEN_KEY = 'auth_token';
  token: '';
  user: any[] = [];

  constructor(public navCtrl: NavController,
              private authProvider: AuthProvider,
              public storage: Storage,
              private helper: JwtHelperService) {
  }

  ngOnInit() {
    this.user = [];
    this.authProvider.getData().subscribe((res: any) => {
      this.user = res[0];
    })
  }

  logout() {
    this.authProvider.logout();
  }
}
