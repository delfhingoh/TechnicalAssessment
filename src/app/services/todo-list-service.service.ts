import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { TodoListStorageService } from '../services/todo-list-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoListServiceService 
{
  // Inject the storage service to use it
  constructor(private storage : TodoListStorageService)
  {
  }

  //// FUNCTIONS to INTERACT with FIRESTORE DATABASE ///
  // Get the OBSERVABLE Data from FIRESTORE
  getTodoListFromFire()
  {
     return this.storage.getTodoFromFire();
  }

  // Add the new TODO into the FIRESTORE DATABASE
  addTodoToFire(thisTodo : Todo)
  { 
    return this.storage.postTodoToFire(thisTodo);
  }

  // Remove this TODO from the FIRESTORE DATABASE
  removeTodoFromFire(thisTodo : Todo)
  {
    return this.storage.destroyTodoFromFire(thisTodo);
  }

  /// FUNCTIONS to INTERACT with LOCAL STORAGE ///
  // Get the list using get function from the storage service
  getTodoList()
  {
    return this.storage.get();
  }

  // Add into the the array list using post function from the storage service
  addTask(taskName : string)
  {
    return this.storage.post(taskName);
  }

  // Remove this Task using destroy function from the storage service
  removeTask(task : Todo)
  {
    return this.storage.destroy(task);
  }

  // Update Task Name
  updateTaskName(newTodo : Todo, oldTodo : Todo)
  {
    return this.storage.put(oldTodo, newTodo);
  }
}
