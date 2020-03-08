
//libraries
import { Component, Input } from '@angular/core';

//services
import { TaskService } from 'src/app/services/task.service';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';

@Component({
    selector: 'app-task-element',
    templateUrl: './task-element.component.html',
    styleUrls: ['./task-element.component.scss']
})
export class TaskElementComponent {

    constructor(private taskService: TaskService) { }

    @Input() task: TaskDetails;

    editMode: boolean = false;

    editedTask: string;

    ngOnChanges(){
        this.editedTask = this.task.text;
    }

    public onTaskStatusChange(task:TaskDetails, $event: boolean): void{
        task.isCompleted = $event;
        task.isCompleted ? this.taskService.completeTask.next(task) :  this.taskService.undoCompleteTask.next(task);
    }

    public onSave(): void{
        this.task.text = this.editedTask;
        this.editMode = false;
    }

    public onCancel(): void{
        this.editedTask = this.task.text;
        this.editMode = false; 
    }

    public onDelete(task): void{
        this.taskService.deleteTask.next(task);
    }

}
