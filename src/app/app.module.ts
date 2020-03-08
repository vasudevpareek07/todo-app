
//libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//routing-module
import { AppRoutingModule } from './app-routing.module';

//root-component
import { AppComponent } from './app.component';

//pages
import { TodoDashboardComponent } from './components/pages/todo-dashboard/todo-dashboard.component';

//sub-pages
import { AddItemComponent } from './components/sub-pages/add-item/add-item.component';
import { TodoListComponent } from './components/sub-pages/todo-list/todo-list.component';
import { CompletedListComponent } from './components/sub-pages/completed-list/completed-list.component';

//reusables
import { TaskElementComponent } from './components/reusables/task-element/task-element.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//services
import { TaskService } from 'src/app/services/task.service';

@NgModule({
    declarations: [
        AppComponent,
        AddItemComponent,
        TodoListComponent,
        CompletedListComponent,
        TaskElementComponent,
        TodoDashboardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule
    ],
    providers: [TaskService],
    bootstrap: [AppComponent]
})
export class AppModule { }
