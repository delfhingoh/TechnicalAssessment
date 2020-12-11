import { Injectable } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import { Todo } from '../models/Todo';

const storageName = "todo_list";
const defaultList : Todo[] = 
[
  {
    id : 1,
    title : "Task ABC"
  },
  {
    id : 2,
    title : "Task CDE"
  },
  {
    id : 3,
    title : "Task EFG"
  },
];

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService 
{
  private todoList : Todo[];

  private index : number;
  private tempId : number;

  constructor()
  {
    // JSON.parse = Turning JSON into object
    // Putting the data into this Todo[] array.
    this.todoList = JSON.parse(localStorage.getItem(storageName)) || defaultList;
  }

  // Return the TODO List
  get()
  {
    // ... iterate through this list and return it
    return [...this.todoList];
  }

  // Add a new TODO into the List
  post(taskName : string)
  {
    this.tempId = this.todoList.length;

    // Create a temporary TODO variable
    var tempTodo : Todo = { id: 0, title: ""};
    // Store the added TODO item into this temp variable
    tempTodo.id = this.tempId;
    tempTodo.title = taskName;

    // Push the newly created TODO item into the array
    this.todoList.push(tempTodo);
    // Trigger the update() that will save this newly added array into localstorage
    return this.update();
  }

  // Update a TODO item in the list
  put(todo : Todo, newTodo : Todo)
  {
    Object.assign(this.todoList[this.findTodoIndex(todo)], newTodo);
    return this.update();
  }

  // Remove this TODO item from the list
  destroy(todo : Todo)
  {
    // Remove this TODO from that index using splice and update or change the array
    this.todoList.splice(this.findTodoIndex(todo), 1);
    return this.update();
  }

  // This is to update the localstorage data
  private update()
  {
    localStorage.setItem(storageName, JSON.stringify(this.todoList));
    return this.get();
  }

  // Find an index of a TODO item from the list
  private findTodoIndex(todo : Todo) : number
  {
    // Iterate through this todoList and find the matching ID task.
    // Assign the matching task index into the variable
    // Return the found index of this todo
    this.todoList.forEach((temp, index) => { if(temp.id == todo.id) this.index = index; } );
    return this.index;
  }
}
