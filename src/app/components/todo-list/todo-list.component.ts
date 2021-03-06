import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Importing the 'Trash' icon from fontawesome
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

// This is a component for the list that shows the tasks
export class TodoListComponent
{
  @Input() todoList: Todo[];

  // These are the event emitters of AddTodo, RemoveTodo and EditTodo
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() edit = new EventEmitter();

  captureThisName(thisName) 
  { 
    this.newTodo = thisName; 
  }

  addThis(thisName)
  {
    this.add.emit(thisName);
    this.newTodo = "";    // Reset the input
  }

  editThis(thisTodo : Todo, thisName : string)
  {
    var tempArray = [thisTodo ,  thisName];
    this.edit.emit(tempArray);
  }

  newTodo : string = "";
  faTrash = faTrash;
}
