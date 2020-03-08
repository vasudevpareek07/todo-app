//libraries
import { TestBed } from '@angular/core/testing';

//services
import { TaskService } from './task.service';

describe('TaskService', () => {

    beforeEach(() => TestBed.configureTestingModule({
        providers: [ TaskService ],
    }));

    it('should be created', () => {
        const service: TaskService = TestBed.get(TaskService);
        expect(service).toBeTruthy();
    });
    
});
