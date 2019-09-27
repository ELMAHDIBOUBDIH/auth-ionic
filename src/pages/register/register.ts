import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {
    username: '',
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private authProvider: AuthProvider,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.authProvider.register(this.user).subscribe((res) => {
      this.showAlert(res.msg);
      this.authProvider.login(this.user).subscribe()
    }, e => {
      this.showAlert(e.error)
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
}
