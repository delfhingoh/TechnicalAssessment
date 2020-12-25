import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importing the ICONS from FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoListStorageService } from '../app/services/todo-list-storage.service';

// Import Angular Fire to use Firestore
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Import NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TodoEffects } from './components/todo.effects';
import { todoReducer } from './components/todo.reducers';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    StoreModule.forRoot({ todoList : todoReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

    EffectsModule.forRoot([ TodoEffects ]),
  ],
  providers: [TodoListStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
