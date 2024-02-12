import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

// AuthService is used to handle the authentication of users
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  sendPasswordResetEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  isLoggedIn() {
    return this.afAuth.authState;
  }

  logout() {
    return this.afAuth.signOut();
  }

  delete() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return user.delete();
    } else {
      return Promise.reject(new Error('No user is currently signed in.'));
    }
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

}
