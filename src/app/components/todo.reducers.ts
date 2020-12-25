import { ADD_TODO, DELETE_TODO, EDIT_TODO } from './todo.actions';
import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/Todo';

const initialState : Todo[] =
[
    { 
        orderNum: 0, 
        id: "12536TaskABCZsdefhsn", 
        title: "Task ABC" 
    },
    { 
        orderNum: 1, 
        id: "133658552TaskCDEasdsf", 
        title: "Task CDE" 
    },
]

export const todoReducer = createReducer<Todo[]>(initialState,

    // This ADD_TODO: Takes the previous state and appends the 'todo' to the end of the array
    on(ADD_TODO, (state, { todo }) => [...state, todo]),
    // This DELETE_TODO: Filter returns a new array that meets the condition of not containing that todoID
    on(DELETE_TODO, (state, { todoID }) => state.filter(todo => todo.id !== todoID)),
);

// export const editTodoIDReducer = createReducer<string>("",
    
//     on(EDIT_TODO, (_, action) => action.todoID)
// );