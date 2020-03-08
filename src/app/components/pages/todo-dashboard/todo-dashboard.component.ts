
//libraries
import { TaskService } from 'src/app/services/task.service';
import { Subscription } from 'rxjs';

//services
import { Component, OnInit } from '@angular/core';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';

@Component({
    selector: 'app-todo-dashboard',
    templateUrl: './todo-dashboard.component.html',
    styleUrls: ['./todo-dashboard.component.scss']
})

export class TodoDashboardComponent implements OnInit {

    constructor(private taskService: TaskService) { }

    allPendingTasks: Array<TaskDetails> = [];

    allCompletedTasks: Array<TaskDetails> = [];

    subscription: Subscription = new Subscription();

    ngOnInit() {
        this.subscription.add(this.taskService.deleteTask.subscribe((res: TaskDetails)=>{
            this.deleteTask(res);
        }));

        this.subscription.add(this.taskService.completeTask.subscribe((res: TaskDetails)=>{
            this.completeTask(res);
        }));

        this.subscription.add(this.taskService.undoCompleteTask.subscribe((res: TaskDetails)=>{
            this.undoCompleteTask(res);
        }));
    }

    public addTask(task: TaskDetails): void{
        this.allPendingTasks.push(task);
        this.allPendingTasks = this.sortTasks(this.allPendingTasks);
    }

    public deleteTask(task: TaskDetails): void{
        task.isCompleted ? 
        this.allCompletedTasks = this.sortTasks(this.removeFromCompletedTask(task)) :
        this.allPendingTasks = this.sortTasks(this.removeFromPendingTask(task));
    }

    public completeTask(task: TaskDetails): void{
        this.allCompletedTasks.push(task);
        this.allPendingTasks = this.sortTasks(this.removeFromPendingTask(task));
        this.allCompletedTasks = this.sortTasks(this.allCompletedTasks);
    }

    public undoCompleteTask(task: TaskDetails): void{
        this.allCompletedTasks = this.sortTasks(this.removeFromCompletedTask(task));
        this.allPendingTasks.push(task);
        this.allPendingTasks = this.sortTasks(this.allPendingTasks);
    }

    public removeFromPendingTask(task): Array<TaskDetails>{
        return this.allPendingTasks.filter(obj => obj.id != task.id);
    }

    public removeFromCompletedTask(task): Array<TaskDetails>{
        return this.allCompletedTasks.filter(obj => obj.id != task.id);
    }

    public sortTasks(tasks): Array<TaskDetails>{
        return tasks.sort(function(a, b) { 
          return b.id - a.id;
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
