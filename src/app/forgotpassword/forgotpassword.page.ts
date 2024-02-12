import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

// Component for the forgot password page
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})

// Defines the main functionality of the forgot password page
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router
  ) {}

  async sendPasswordResetEmail() {
    if (this.email) {
      try {
        await this.authService.sendPasswordResetEmail(this.email);
        this.presentToast('Passwort-Reset-E-Mail gesendet.');
        this.navCtrl.navigateBack('/login');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unbekannter Fehler';
        this.presentToast('Fehler beim Senden der E-Mail: ' + errorMessage);
      }
    } else {
      this.presentToast('Bitte geben Sie eine E-Mail-Adresse ein.');
    }
  }

  // Method to navigate to the login page
  navigateToLogin() {
    this.router.navigateByUrl('/login'); 
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
