
//libraries
import { Component, Input } from '@angular/core';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';

@Component({
    selector: 'app-completed-list',
    templateUrl: './completed-list.component.html',
    styleUrls: ['./completed-list.component.scss']
})

export class CompletedListComponent{

    constructor() { }

    @Input() allCompletedTasks: Array<TaskDetails>;

}
