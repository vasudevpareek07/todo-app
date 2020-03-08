//libraries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';

//components
import { TodoDashboardComponent } from './todo-dashboard.component';
import { AddItemComponent } from '../../sub-pages/add-item/add-item.component';
import { TodoListComponent } from '../../sub-pages/todo-list/todo-list.component';
import { CompletedListComponent } from '../../sub-pages/completed-list/completed-list.component';

//services
import { TaskService } from 'src/app/services/task.service';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';

describe('TodoDashboardComponent', () => {
    let component: TodoDashboardComponent;
    let fixture: ComponentFixture<TodoDashboardComponent>;

    let taskServiceSpy: jasmine.SpyObj<TaskService>;

    const taskData: TaskDetails = { id: 1, text: 'Task 1', isCompleted: false };

    beforeEach(async(() => {

        const spy = jasmine.createSpy('TaskService');

        TestBed.configureTestingModule({
            imports: [ FormsModule ],
            declarations: [ TodoDashboardComponent, AddItemComponent, TodoListComponent, CompletedListComponent ],
            providers: [TodoDashboardComponent, { provide: TaskService, useValue: spy }],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
        .compileComponents();

        component = TestBed.get(TodoDashboardComponent);
        
        taskServiceSpy = TestBed.get(TaskService);

        taskServiceSpy.completeTask = new Subject<TaskDetails>();

        taskServiceSpy.undoCompleteTask = new Subject<TaskDetails>();

        taskServiceSpy.deleteTask = new Subject<TaskDetails>();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    function resetData(){
        component.allPendingTasks = [];
        component.allCompletedTasks = [];
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('addTask', ()=>{
        const taskToBeAdded: TaskDetails = taskData;
        resetData();
        component.addTask(taskToBeAdded);
        expect(component.allPendingTasks.length).toBe(1);
        expect(component.allPendingTasks[0]).toEqual(taskToBeAdded);
    });


    it('deleteTask', ()=>{
        let task: TaskDetails = taskData;
        
        resetData();
        component.addTask(task);
        expect(component.allPendingTasks.length).toBe(1);
        component.deleteTask(task);
        expect(component.allPendingTasks.length).toBe(0);

        resetData();
        task.isCompleted = true;
        component.allCompletedTasks = [task];
        expect(component.allCompletedTasks.length).toBe(1);
        component.deleteTask(task);
        expect(component.allCompletedTasks.length).toBe(0); 
    });

    it('completeTask', ()=>{
        let task: TaskDetails = taskData;
        resetData();
        component.addTask(task);
        task.isCompleted = true;
        component.completeTask(task);
        expect(component.allCompletedTasks.length).toBe(1);
    })

    it('undoCompleteTask', ()=>{
        let task: TaskDetails = taskData;
        resetData();
        component.addTask(task);

        task.isCompleted = true;
        component.completeTask(task);
        expect(component.allCompletedTasks.length).toBe(1);

        component.undoCompleteTask(task);
        expect(component.allPendingTasks.length).toBe(1);
        expect(component.allCompletedTasks.length).toBe(0);
    });

    it('removeFromPendingTasks', ()=>{
        let task: TaskDetails = taskData;
        resetData();
        component.addTask(task);
        expect(component.allPendingTasks.length).toBe(1);
        expect(component.removeFromPendingTask(task).length).toBe(0);
    });

    it('removeFromCompletedTasks', ()=>{
        let task: TaskDetails = taskData;
        resetData();
        task.isCompleted = true;
        component.allCompletedTasks = [task]
        expect(component.allCompletedTasks.length).toBe(1);
        expect(component.removeFromCompletedTask(task).length).toBe(0);
    });

    it('sortTasks by latest created', ()=>{

        let unSortedTasks = [
          { id: 1, text: 'Task 1', isCompleted: false },
          { id: 2, text: 'Task 2', isCompleted: false }
        ];

        let sortedTasks = [
          { id: 2, text: 'Task 2', isCompleted: false },
          { id: 1, text: 'Task 1', isCompleted: false }
        ];

        expect(component.sortTasks(unSortedTasks)).toEqual(sortedTasks);

    });

});
