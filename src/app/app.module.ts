import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';


export const firebaseConfig = {
  apikey: 'AIzaSyBtPzp_G234ey4gAIQ2UUIWsodFb7MdrKo',
  authDomain: 'ng-notes-7232c.firebaseapp.com',
  databaseURL: 'https://ng-notes-7232c.firebaseio.com',
  storageBucket: 'ng-notes-7232c.appspot.com',
  messagingSenderId: '1048288516885'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
