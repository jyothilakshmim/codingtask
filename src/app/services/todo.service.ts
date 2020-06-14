import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoTitle: string = '';
  idForTodo: number = 4;
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todos: Todo[] = [
    {
      'id': 1,
      'title': 'Finish Angular Screencast',
      'completed': false,
      'editing': false,
    },
    {
      'id': 2,
      'title': 'Take over world',
      'completed': false,
      'editing': false,
    },
    {
      'id': 3,
      'title': 'One more thing',
      'completed': false,
      'editing': false,
    },
  ];

  constructor() {
    /* let todos = this.getTodos();
    if(todos.length == 0) {
      this.idForTodo = 0;
    }
    else{
      let maxId = todos[todos.length-1].id;
      this.idForTodo= maxId+1;
    } */
  }

  /* public getTodos():Todo[] {
    let localStorageItem = JSON.parse(localStorage.getItem('todos'));
    return localStorageItem == null ? [] : localStorageItem.todos;
  } */

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }
    //let todos = this.getTodos();
    //todos.unshift({})
    this.todos.unshift({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false
    })
    // this.setLocalStorageTodos(todos)
    this.idForTodo++;
  }



  deleteTodo(id: number, completed:boolean): void {
    //let todos = this.getTodos();
    if(!completed){
    if(confirm("Are you sure to delete "))
    {
      //todos = todos.filter(todo => todo.id !== id);
    this.todos = this.todos.filter(todo => todo.id !== id);
    }
  }
    else{
      //todos = todos.filter(todo => todo.id !== id);
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
    //this.setLocalStorageTodos(todos);
  }

  remaining(): number {
    //let todos = this.getTodos();
    //return todos.filter(todo => !todo.completed).length;
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    //let todos = this.getTodos();
    // return todos.filter(todo => todo.completed).length > 0;
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    //let todos = this.getTodos();
    //todos = this.todos.filter(todo => !todo.completed);
    this.todos = this.todos.filter(todo => !todo.completed);
  }



  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): Todo[] {
    //let todos = this.getTodos();
    if (this.filter === 'all') {
      return this.todos;
      //return todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
      //return todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
      // return todos.filter(todo => todo.completed);
    }
    // return todos
    return this.todos;
  }
  /* private setLocalStorageTodos (todos:Todo[]: void){
    localStorage.setItem('todos', JSON.stringify({todos: todos});)
  } */
}
