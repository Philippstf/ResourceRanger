import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { NavController } from '@ionic/angular'
import { AuthError } from 'firebase/auth';

// Component for the login page
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

// Defines the main functionality of the login page based on Firebase
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  passwordIncorrect: boolean = false;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
  }

  // Method to login the user
  login() {
    this.authService.login(this.username, this.password)
      .then(res => {
        console.log('Logged in:', res); 
        this.navCtrl.navigateForward('/tabs/tab2');
        this.passwordIncorrect = false;
      })
      .catch((error: AuthError) => {
        console.error('Login error:', error);
        this.passwordIncorrect = true;
      });
  }
    
  // Method to navigate to the forgot password page
  forgotPassword() {
    this.navCtrl.navigateForward('/forgotpassword');
  }

  // Method to navigate to the create account page
  createAccount() {
    this.navCtrl.navigateForward('/createaccount');
  }

}
