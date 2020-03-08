
//libraries
import { Component, Output, EventEmitter } from '@angular/core';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})

export class AddItemComponent{
    
    constructor() { }

    @Output() taskToBeAdded: EventEmitter<TaskDetails> = new EventEmitter<TaskDetails>();

    taskObj: TaskDetails = new TaskDetails();

    taskIdCounter:number = 0;

    public addTask(): void{
        this.taskIdCounter += 1;
        this.taskObj.id = this.taskIdCounter;
        this.taskToBeAdded.emit(this.taskObj);
        this.taskObj = new TaskDetails();
    }

}
