import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Todo } from '../models/Todo';

const storageName = "todo_list";
const defaultList : Todo[] = 
[
  {
    orderNum : 0,
    id: "",
    title : "Task ABC"
  },
  {
    orderNum : 1,
    id : "",
    title : "Task CDE"
  },
  {
    orderNum : 2,
    id : "",
    title : "Task EFG"
  },
];

@Injectable({
  providedIn: 'root'
})
export class TodoListStorageService 
{
  private todoList : Todo[];

  private todoCollection : AngularFirestoreCollection<Todo>;
  private todoDocument : AngularFirestoreDocument<Todo>;
  private todoObservable : Observable<Todo[]>;

  private index : number;
  private tempOrderNum : number;

  constructor(public store : AngularFirestore)
  {
    // JSON.parse = Turning JSON into object
    // Putting the data into this Todo[] array.
    // this.todoList = JSON.parse(localStorage.getItem(storageName)) || defaultList;

    // Putting the data from FIRESTORE of 'Todo' collection into an observable
    // Using snapshotChanges() to get the id of each document in this collection
    this.todoCollection = this.store.collection<Todo>('TodoCollection', ref => ref.orderBy('orderNum', 'asc'));
    this.todoObservable = this.todoCollection.snapshotChanges().pipe(map(changes => 
      {
        return changes.map(a => 
          {
            const data = a.payload.doc.data() as Todo;
            data.id = a.payload.doc.id;

            return data;
          });
      }));
  }

  /// FUNCTIONS to INTERACT with FIRESTORE ///
  // Return the Observable from the FIRESTORE database
  getTodoFromFire()
  {
    return this.todoObservable;
  }

  // Add into the FIRESTORE database
  postTodoToFire(thisTodo : Todo)
  {
    // Add it into the collection of 'TodoCollection' at FIRESTORE
    this.todoCollection.add(thisTodo);
  }

  // Delete from the FIRESTORE database
  destroyTodoFromFire(thisTodo : Todo)
  {
    // Document Path: Collections > Documents
    this.todoDocument = this.store.doc("TodoCollection/" + thisTodo.id);
    this.todoDocument.delete();
  }

  // Update this TODO in the FIRESTORE database
  updateTodoInFire(thisTodo : Todo)
  {
    // Document Path: Collections > Documents
    this.todoDocument = this.store.doc("TodoCollection/" + thisTodo.id);
    this.todoDocument.update(thisTodo);
  }


  /// FUNCTIONS to INTERACT with LOCAL STORAGE ///
  // Return the TODO List
  get()
  {
    // ... iterate through this list and return it
    return [...this.todoList];
  }

  // Add a new TODO into the List
  post(taskName : string)
  {
    this.tempOrderNum = this.todoList.length;

    // Create a temporary TODO variable
    var tempTodo : Todo = { orderNum: 0, id: "", title: ""};
    // Store the added TODO item into this temp variable
    tempTodo.orderNum = this.tempOrderNum;
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
