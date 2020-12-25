import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ADD_TODO,
          DELETE_TODO,
          EDIT_TODO,
          LOAD_TODO
        } from './components/todo.actions';

import { TodoListStorageService } from './services/todo-list-storage.service';

import { Todo } from './models/Todo';
import { v4 as uuid } from 'uuid';
import { AppState } from './app-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  todoList$ = this.store.pipe(select(state => state.todoList));

  constructor(private storageService : TodoListStorageService, private store : Store<AppState>) {}

  ngOnInit()
  {
    this.store.dispatch(LOAD_TODO());
  }

  // Adding the user inputted TODO into the LIST
  onAdd(newTodo : string)
  {  
    var currentSize = 0;
    this.todoList$.subscribe(temp => currentSize = temp.length);

    var todo : Todo = { orderNum: currentSize, id: uuid(), title: newTodo };
    this.store.dispatch(ADD_TODO( { todo } ));
  }

  // Remove the TODO chosen by user
  onRemove(thisTodo : Todo)
  {
    var todo : Todo;
    todo = thisTodo;

    this.store.dispatch(DELETE_TODO( { todo } ));
  }

  // Edit the TODO
  onEdit(thisTodo : Todo)
  {
    var todo : Todo = { orderNum: thisTodo[0].orderNum, id: thisTodo[0].id, title: thisTodo[1] };
    console.log(todo);

    this.store.dispatch(EDIT_TODO( { todo } ));
  }
}
