import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../Services/notes.service';
import { Router } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [LoaderComponent,NgIf,NgFor,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  notes:any[] = []
  loading = false
  
  categoryColors: { [key: string]: string } = {
    C: '#1dd3b0',
    CPP: '#7209b7',
    Java: '#ff5400',
    ReactJs: '#0496ff',
    Angular: '#ff0a54',
  };

  backgroundColors: { [key: string]: string } = {
    C: '#1dd3b0',
    CPP: '#7209b7',
    Java: '#ff5400',
    ReactJs: '#0496ff',
    Angular: '#ff0a54',
  };
 


  constructor(private service:NoteService, private router:Router, private toastr:ToastrService){}

  ngOnInit(): void {
      this.getAllNote()
  }

  addNote(){
    this.router.navigateByUrl('add')
  }

  getBorderColor(category: string): string {
    return this.categoryColors[category]; 
  }
  getgbackgroundColors(category: string): string{
    return this.backgroundColors[category]; 
  }

  editNote(id:any){
    this.router.navigateByUrl(`update/${id}`)
  }

  deleteNote(id:any){
    this.service.setAction("Deleting Note....")
    this.loading=true
    setTimeout(() =>{
      this.service.deleteNote(id).subscribe({
        next:(data:any) =>{
          this.loading=false
          if(data.status){
            this.toastr.success('Note Deleted !!!',"Success",{timeOut:2500,closeButton:true})
            this.getAllNote()
          }
        },
        error:(err:any)=>{
          this.toastr.error('Internal Server Error ....',"Error",{timeOut:2500,closeButton:true})
          console.log(err)
        }
      })
    },1200);
  }

  getAllNote(){
    this.service.setAction("Getting Note....")
    this.loading=true
    setTimeout(() =>{
      this.service.getAllNote().subscribe({
        next:(data:any) =>{
          this.notes=data.message
          this.loading=false
        },
        error:(err:any)=>{
          this.toastr.error('Internal Server Error ....',"Error",{timeOut:2500,closeButton:true})
          console.log(err)
        }
      })
    },1200);
  }

}
