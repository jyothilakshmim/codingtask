import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoTitle: string = '';
  idForTodo: number = 0;
  filter: string = 'all';
  todos: Todo[] = [];
  remaining: number = 0;
  atLeastOneCompleted: boolean = false;

  constructor() {
    this.todos = this.getTodos();
    this.updateRemainigCompleted();
    if(this.todos.length == 0) {
      this.idForTodo = 0;
    }
    else{
      let maxId = this.todos[0].id;
      this.idForTodo= maxId+1;
    }
  }

  public getTodos():Todo[] {
    let localStorageItem = JSON.parse(localStorage.getItem('todos'));
    return localStorageItem == null ? [] : localStorageItem.todos;
  }

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }
    this.todos.unshift({
      id: this.idForTodo,
      title: todoTitle,
      completed: false
    })
    this.setLocalStorageTodos(this.todos);
    this.idForTodo++;
  }

  deleteTodo(id: number, completed:boolean): boolean {
    let returnValue = true;
    if(!completed){
      if(confirm("Are you sure to delete "))
        {
          this.todos = this.todos.filter(todo => todo.id !== id);
        } else {
          returnValue = false;
        }
      }
    else {
      this.todos = this.todos.filter(todo => todo.id !== id);
    }
    this.setLocalStorageTodos(this.todos);
    return returnValue;
  }

  todoCompleted(id: number): void {
    this.todos.map((todo: Todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
    })
    this.setLocalStorageTodos(this.todos);
  }

  updateRemainigCompleted(): void {
    this.remaining = this.todos.filter(todo => !todo.completed).length;
    this.atLeastOneCompleted = this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.setLocalStorageTodos(this.todos);
  }

  todosFiltered(filter = 'all'): void {
    this.filter = filter;
    this.todos = this.getTodos();
    if (this.filter === 'active') {
      this.todos = this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      this.todos =  this.todos.filter(todo => todo.completed);
    }
  }

  private setLocalStorageTodos (todos:Todo[]){
    this.updateRemainigCompleted();
    localStorage.setItem('todos', JSON.stringify({'todos': todos}));
  }
}
