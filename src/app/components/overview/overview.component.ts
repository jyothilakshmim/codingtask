import { Component, OnInit, HostListener, Input } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [TodoService],

})
export class OverviewComponent implements OnInit {

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
  }


  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent) {
    let evt = event
    const a = <HTMLElement>document.activeElement.previousElementSibling
    const b = <HTMLElement>document.activeElement.nextElementSibling
    let selectedId;
    let selectedTodo: Todo;
    if (document.activeElement.children.length) {
      selectedId = document.activeElement.children[0].id;
      this.todoService.todos.map(todo => {
          if(todo.id === Number(selectedId)) selectedTodo = todo;
      });
    }
    switch (evt.keyCode) {
      case 38:
        if (this.todoService.todos.length && !selectedId) {
          let doc = <HTMLElement>document.getElementById(String(this.todoService.todos[0].id)).parentNode
          doc.focus();
        } else {
          a?.focus();
        }
        break;
      case 40:
        if (this.todoService.todos.length && !selectedId) {
          let doc = <HTMLElement>document.getElementById(String(this.todoService.todos[0].id)).parentNode
          doc.focus();
        } else {
          b?.focus();
        }
        break;
      case 46:
        if (selectedId) {
          if (this.todoService.deleteTodo(selectedTodo.id, selectedTodo.completed)) {
            if (b) {
              b?.focus();
            } else {
              a?.focus();
            }
          }
        }
        break;
      case 13:
        if (selectedId) {
          this.todoService.todoCompleted(selectedTodo.id);
        }
        break;
    }
  }
}

