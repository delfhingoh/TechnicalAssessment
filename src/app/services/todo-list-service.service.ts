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

  // Get the list using get function from the storage service
  getTodoList()
  {
    return this.storage.get();
  }

  // Get the OBSERVABLE Data from FIRESTORE
  getTodoObservable()
  {
     return this.storage.getTodoObservable();
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
