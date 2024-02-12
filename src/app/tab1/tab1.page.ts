import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { FirebaseError } from 'firebase/app';

// Component for the Tab1-Page
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private authService: AuthService, 
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  // Method to present a confirmation alert before deleting the account
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Account sicher löschen?',
      message: 'Möchtest du deinen Account wirklich löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Löschen abgebrochen');
          }
        }, {
          text: 'Löschen',
          handler: () => {
            this.deleteAccountConfirmed();
          }
        }
      ]
    });

    await alert.present();
  }

  // Method to confirm and delete the account
  deleteAccountConfirmed() {
    this.authService.delete().then(() => {
      this.navCtrl.navigateForward('/login'); 
    }).catch((error: FirebaseError) => {
      console.error('Deletion failed', error.code, error.message);
    });
  }

  deleteAccount() {
    this.presentAlertConfirm();
  }

  // Method to log out the user
  logOut() {
    this.authService.logout().then(() => {
      this.navCtrl.navigateForward('/login'); 
    }).catch((error: FirebaseError) => {
      console.error('Logout failed', error.code, error.message);
    });
  }
}
