//libraries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

//components
import { AddItemComponent } from './add-item.component';

//classes
import { TaskDetails } from 'src/app/classes/task-data.class';

describe('AddItemComponent', () => {
    let component: AddItemComponent;
    let fixture: ComponentFixture<AddItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [ AddItemComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit on addTask', () => {
        spyOn(component.taskToBeAdded, 'emit');
        component.addTask();
        fixture.detectChanges();
        expect(component.taskToBeAdded.emit).toHaveBeenCalled();
    });
});
