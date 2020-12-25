import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ADD_TODO, DELETE_TODO, EDIT_TODO } from './components/todo.actions';
import { TodoListStorageService } from './services/todo-list-storage.service';

import { Todo } from './models/Todo';
import { v4 as uuid } from 'uuid';
import { AppState } from './app-state';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  todoList$ : Observable<Todo[]>;

  // Adding the user inputted TODO into the LIST
  onAdd(newTodo)
  {  
    var currentSize = 0;
    this.todoList$.subscribe(temp => currentSize = temp.length);

    var todo : Todo = { orderNum: currentSize, id: uuid(), title: newTodo };
    this.store.dispatch(ADD_TODO( { todo } ));
  }

  onRemove(thisTodo)
  {
    var todoID : string = "";
    todoID = thisTodo.id;

    this.store.dispatch(DELETE_TODO( { todoID } ));
  }

  constructor(private storageService : TodoListStorageService, private store : Store<AppState>) {}

  ngOnInit()
  {
    this.todoList$ = this.store.select(store => store.todoList);
    console.log(this.todoList$.subscribe());

    //this.storageService.getTodoFromFire().subscribe(todoList => { this.todoList$ = todoList; } );

      //   this.todoListService.getTodoListFromFire().subscribe(todoList => { this.testTodoList = todoList; } );

  }
}
