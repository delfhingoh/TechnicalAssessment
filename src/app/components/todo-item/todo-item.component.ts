import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Importing the 'Trash' icon from fontawesome
import{ Todo, ITodo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

// This is a component for ONE task
export class TodoItemComponent implements OnInit 
{
  @Input() todo: ITodo;
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() editTaskName : EventEmitter<any> = new EventEmitter();

  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void 
  {
    console.log(this.todo.title);
  }

  // onDelete method
  // If the delete icon is clicked, then the output will be emitted to the todo-list component
  onDelete(todo : Todo) : void
  {
    this.remove.emit(todo);
  }

  // changeTaskTitle method
  // If user has pressed enter after changing the name, then the output will be emitted to the todo-list component
  changeTaskTitle(newTitle : string) : void
  {
    // var tempArray : Todo[] = [];
    // var oldTodo : Todo = { id: this.todo.id, title: this.todo.title };
    // var newTodo : Todo = { id: 0, title: "" };

    // tempArray.push(oldTodo);

    // // Change the title
    // this.todo.title = newTitle;
    // newTodo = this.todo;
    // tempArray.push(newTodo);

    // // Putting an array as a parameter as it could only accept 1
    // this.editTaskName.emit(tempArray);
  }
}
