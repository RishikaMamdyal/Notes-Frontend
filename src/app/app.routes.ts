import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddNotesComponent } from './Components/add-notes/add-notes.component';

export const routes: Routes = [
    {path:'',component:DashboardComponent},
    {path:'add',component:AddNotesComponent},
    {path:'update/:noteId',component:AddNotesComponent}];
