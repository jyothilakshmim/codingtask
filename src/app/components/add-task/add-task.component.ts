import { Component, OnInit, Input } from '@angular/core';

import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Input() todo: Todo;
  todoTitle: string;
  constructor(public todoService: TodoService) { }

  ngOnInit() {
    this.todoTitle = '';
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todoService.addTodo(this.todoTitle);

    this.todoTitle = '';
  }
}
