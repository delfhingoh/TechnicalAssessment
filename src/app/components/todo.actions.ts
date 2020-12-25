import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';

// [Todo] Add Todo : This is the unique name of the action for organisation purposes.
// The SECOND parameter : This is where I define the actual TYPE of the data for this action.
// This is to Add a TODO into the List and the subsequent functions should be self-explanatory.
export const ADD_TODO =  createAction('[Todo] Add Todo', props<{ todo : Todo }>());

// The TYPE of these 2 functions are string because the ID will be from the FIRESTORE
export const DELETE_TODO = createAction('[Todo] Delete Todo', props<{ todoID : string }>());
export const EDIT_TODO = createAction('[Todo] Edit Todo', props<{ todoID : string }>());