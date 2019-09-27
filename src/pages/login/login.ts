import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BehaviorSubject} from "rxjs";
import {RegisterPage} from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {
    username: '',
    email: ''
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authProvider: AuthProvider,
              private helper: JwtHelperService,
              private plt: Platform,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.authProvider.getToken();
  }

  login() {
    this.authProvider.login(this.user).subscribe((res) => {
        if (res.done)
          this.user = this.helper.decodeToken(res['token']);
        else
          this.showAlert(res.msg);
      },
      (err) => {
        console.log(err.message);
      })
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Oops !',
      subTitle: message,
      buttons: ['ok']
    });
    alert.present();
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}
