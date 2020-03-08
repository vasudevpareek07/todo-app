//libraries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//components
import { TaskElementComponent } from './task-element.component';

//services
import { TaskService } from 'src/app/services/task.service';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';


describe('TaskElementComponent', () => {
    let component: TaskElementComponent;
    let fixture: ComponentFixture<TaskElementComponent>;
    let taskServiceSpy: jasmine.SpyObj<TaskService>;
    const taskData: TaskDetails = { id: 1, text: 'Task 1', isCompleted: false };

    beforeEach(async(() => {

        const spy = jasmine.createSpyObj('TaskService', ['getTaskToBeDeleted', 'getTaskToBeCompleted', 'getTaskToBeUndoCompleted']);
        
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ TaskElementComponent ],
            providers: [TaskElementComponent, { provide: TaskService, useValue: spy }],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
        .compileComponents();

        component = TestBed.get(TaskElementComponent);

        taskServiceSpy = TestBed.get(TaskService);

        taskServiceSpy.completeTask = new Subject<TaskDetails>();

        taskServiceSpy.undoCompleteTask = new Subject<TaskDetails>();

        taskServiceSpy.deleteTask = new Subject<TaskDetails>();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskElementComponent);
        fixture.debugElement.componentInstance.task = taskData;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onTaskStatusChange', () => {
        spyOn(taskServiceSpy.completeTask, 'next');
        component.onTaskStatusChange(taskData, true)
        fixture.detectChanges();
        expect(taskServiceSpy.completeTask.next).toHaveBeenCalled();
    });

    it('onSave', () => {
        component.editedTask = 'Task 1 Edited';
        component.onSave();
        expect(component.task.text).toEqual('Task 1 Edited');
    });

    it('onCancel', () => {
        component.task.text = 'Task 1';
        component.editedTask = 'Task 1 Edited';
        component.onCancel();
        expect(component.task.text).toEqual('Task 1');
    });

    it('onDelete', () => {
        spyOn(taskServiceSpy.deleteTask, 'next');
        component.onDelete(taskData)
        fixture.detectChanges();
        expect(taskServiceSpy.deleteTask.next).toHaveBeenCalled();
    });
});
