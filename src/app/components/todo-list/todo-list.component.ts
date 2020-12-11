import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit 
{
  todoArray : Todo[];
  newTask : string = '';
  id : number = 0;

  constructor() { }

  ngOnInit(): void 
  {
    // Temporary TODO List (Hard-Code)
    this.todoArray = 
    [
      {
        id : 1,
        title: "Task ABC"
      },
      {
        id : 2,
        title: "Task BCD"
      },
      {
        id : 3,
        title: "Task CDE"
      }
    ]
  }

  // Change add task input value
  changeValue(inputValue : string)
  {
    this.newTask = inputValue;
  }

  // Add a task into the array
  addTask(newTask : string)
  {
    console.log(newTask);

    this.id = this.todoArray.length + 1;
    this.todoArray.push( { id: this.id, title: newTask} );

    this.resetValue();
  }

  // Reset the input value function
  resetValue()
  {
    this.newTask = '';
  }

}
