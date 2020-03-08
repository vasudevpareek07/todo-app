import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoDashboardComponent } from './components/pages/todo-dashboard/todo-dashboard.component';

const routes: Routes = [
    { path: "", redirectTo: "todo-dashboard", pathMatch: "full" },
    { path: "todo-dashboard", component: TodoDashboardComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
