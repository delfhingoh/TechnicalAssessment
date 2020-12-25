import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';

// [Todo] Add Todo : This is the unique name of the action for organisation purposes.
// The SECOND parameter : This is where I define the actual TYPE of the data for this action.
// This is to Add a TODO into the List and the subsequent functions should be self-explanatory.
export const ADD_TODO =  createAction('[Todo] Add Todo', props<{ todo : Todo }>());

// Delete TODO actions
export const DELETE_TODO = createAction('[Todo] Delete Todo', props<{ todo : Todo }>());

// Edit TODO actions
export const EDIT_TODO = createAction('[Todo] Edit Todo', props<{ todo : Todo }>());

// Loading TODO DATA from FIRESTORE
export const LOAD_TODO = createAction('[Todo] Load Todo Start');
export const LOAD_TODO_DONE = createAction('[Todo] Load Todo Done', props< { todoList : Todo[] } >());
