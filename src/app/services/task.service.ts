
//libraries
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';

@Injectable()

export class TaskService {

    constructor() { }

    public completeTask:Subject<TaskDetails> = new Subject<TaskDetails>();

    public deleteTask:Subject<TaskDetails> = new Subject<TaskDetails>();

    public undoCompleteTask:Subject<TaskDetails> = new Subject<TaskDetails>();

}
