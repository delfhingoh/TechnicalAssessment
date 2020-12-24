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
  // todoArray;
  newTask : string = '';
  id : number = 0;

  testTodoList : Todo[];

  // Inject the todolistservice and use it 
  constructor(private todoListService : TodoListServiceService) { }

  ngOnInit(): void 
  {
    // Get the TODO List from TodoListServiceService
    // this.todoArray = this.todoListService.getTodoList();

    // Get the Observable then SUBSCRIBE in this Component to get and use the data
    this.todoListService.getTodoListFromFire().subscribe(todoList => { this.testTodoList = todoList; } );
  }

  // Change add task input value
  changeValue(inputValue : string)
  {
    this.newTask = inputValue;
  }

  // Add a task using the addTask function from the todolistservice
  addTask(newTask : string)
  {
    if(newTask != '')
    {
      // this.todoArray = this.todoListService.addTask(newTask);
      
      // Create a TEMP TODO variable
      var tempTodo : Todo = { orderNum: 0, id: "", title: ""} ;
      tempTodo.title = newTask;
      tempTodo.orderNum = this.testTodoList.length;

      // Pass in the TODO variable
      this.todoListService.addTodoToFire(tempTodo);
      this.resetValue();
    }
    else
    {
      alert("Please key in some values!");
    }
  }

  // This function will be triggered when the output is emitted from the todo-item component
  // Remove that task selected by user using the removeTask function from todolist service
  removeTask(todo : Todo)
  {
    // this.todoArray = this.todoListService.removeTask(todo);

    // Delete from FIRESTORE
    this.todoListService.removeTodoFromFire(todo);
  }

  // This function will be triggered when the output is emitted from the todo-item component
  // Change that task name with the newly entered title by the user
  // Updated to use FIRESTORE
  editTaskName(updatedTodo : Todo)
  {
    // tempArray[0] = oldTodo
    // tempArray[1] = newTodo
    // this.todoArray = this.todoListService.updateTaskName(tempArray[1], tempArray[0]);

    this.todoListService.changeTodoInFire(updatedTodo);
  }

  // Reset the input value function
  resetValue()
  {
    this.newTask = '';
  }

}
