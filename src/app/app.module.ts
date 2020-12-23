import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importing the ICONS from FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

import { TodoListServiceService } from '../app/services/todo-list-service.service';
import { TodoListStorageService } from '../app/services/todo-list-storage.service';

// Import Angular Fire to use Firestore
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [TodoListServiceService, TodoListStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
