//libraries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//components
import { CompletedListComponent } from './completed-list.component';

describe('CompletedListComponent', () => {
    let component: CompletedListComponent;
    let fixture: ComponentFixture<CompletedListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CompletedListComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CompletedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
