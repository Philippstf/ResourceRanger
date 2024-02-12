import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { NavController } from '@ionic/angular';
import { AuthError } from 'firebase/auth';

// Component for creating a new user account
@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.page.html',
  styleUrls: ['./createaccount.page.scss'],
})
export class CreateAccountPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  // Method to check if the email is valid
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Method to sign up a new user
  signUp() {
    this.authService.signUp(this.email, this.password)
      .then((res) => {
        
        console.log('Erfolgreich registriert!', res);
        this.navCtrl.navigateForward('/login'); 
      })
      .catch((error: AuthError) => {
        console.error('Fehler bei der Registrierung:', error);
      
      });
  }

  navigateToLogin() {
    this.navCtrl.navigateBack('/login'); // Pfad anpassen, falls notwendig
  }
}
