import { Component, OnInit } from '@angular/core';
import { TodoListServiceService } from '../../services/todo-list-service.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

// This is a component for the list that shows the tasks
export class TodoListComponent implements OnInit 
{
  todoArray;
  newTask : string = '';
  id : number = 0;

  // Inject the todolistservice and use it 
  constructor(private todoListService : TodoListServiceService) { }

  ngOnInit(): void 
  {
    // Get the TODO List from TodoListServiceService
    this.todoArray = this.todoListService.getTodoList();
  }

  // Change add task input value
  changeValue(inputValue : string)
  {
    this.newTask = inputValue;
  }

  // Add a task using the addTask function from the todolistservice
  addTask(newTask : string)
  {
    this.todoArray = this.todoListService.addTask(newTask);
    this.resetValue();
  }

  // This function will be triggered when the output is emitted from the todo-item component
  // Remove that task selected by user using the removeTask function from todolist service
  removeTask(todo : Todo)
  {
    this.todoArray = this.todoListService.removeTask(todo);
  }

  // This function will be triggered when the output is emitted from the todo-item component
  // Change that task name with the newly entered title by the user
  editTaskName(tempArray : Todo[])
  {
    // tempArray[0] = oldTodo
    // tempArray[1] = newTodo
    this.todoArray = this.todoListService.updateTaskName(tempArray[1], tempArray[0]);
  }

  // Reset the input value function
  resetValue()
  {
    this.newTask = '';
  }

}
