import { Component, OnInit, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Importing the 'Trash' icon from fontawesome
import{ Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit 
{
  @Input() todo: Todo;
  @Input() todoArray : Todo[];

  faTrash = faTrash;
  todoIndex : number = 0;

  constructor() { }

  ngOnInit(): void 
  {
  }

  // onDelete method
  // This is a function to delete task that is bind to each task item
  onDelete(todo : Todo) : void
  {
    // Go through the array of the Todo Item
    // Find the specific Todo Item that user is deleting, then use splice to remove that object and change to array
    this.todoArray.forEach((temp, index) => { if(temp.id == todo.id) this.todoArray.splice(index, 1);  } );
  }

  // Change the task title function that returns nothing
  changeTaskTitle(newTitle : string) : void
  {
    this.todo.title = newTitle;
  }
}
