import { Todo } from '../app/models/Todo';

export interface AppState
{
    readonly todoList : Todo[];
}
