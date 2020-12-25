import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';

import { TodoListStorageService } from '../services/todo-list-storage.service';
import { LOAD_TODO, LOAD_TODO_DONE, ADD_TODO, DELETE_TODO, EDIT_TODO } from './todo.actions';

@Injectable()
export class TodoEffects
{
    constructor(private storageService : TodoListStorageService, private actions$ : Actions) {}
   
    loadTodoList$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_TODO),
        switchMap(() => 
        {
            return this.storageService.getTodoFromFire().pipe
            (
                map(todoList => LOAD_TODO_DONE( { todoList } )),
            );
        }),
    ));

    addTodo$ = createEffect(() => this.actions$.pipe(
       ofType(ADD_TODO),
       switchMap((action) =>
       {
           return this.storageService.postTodoToFire(action.todo).pipe(
               map(() => LOAD_TODO()),
           );
       }),
    ));

    deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(DELETE_TODO),
        switchMap((action) =>
        {
            return this.storageService.destroyTodoFromFire(action.todo).pipe(
                map(() => LOAD_TODO()),
            );
        }),
    ));

    editTodo$ = createEffect(() => this.actions$.pipe(
        ofType(EDIT_TODO),
        switchMap((action) =>
        {
            return this.storageService.updateTodoInFire(action.todo).pipe(
                map(() => LOAD_TODO()),
            );
        }),
    ));
}