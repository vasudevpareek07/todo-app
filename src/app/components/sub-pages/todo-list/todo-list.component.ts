
//libraries
import { Component, Input } from '@angular/core';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent {

    constructor() { }

    @Input() allPendingTasks: Array<TaskDetails>;

}
