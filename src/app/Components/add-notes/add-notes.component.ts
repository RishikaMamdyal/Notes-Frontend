import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from "../loader/loader.component";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../Services/notes.service';

@Component({
  selector: 'app-add-note',
  imports: [ReactiveFormsModule, NgClass, NgIf, LoaderComponent],
  templateUrl: './add-notes.component.html',
  styleUrl: './add-notes.component.css'
})
export class AddNotesComponent implements OnInit {

  loading = false
  isEdit = false
  
  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router, private service: NoteService) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('noteId')){
      this.isEdit = true
      console.log("check")
      let nId = this.activatedRoute.snapshot.paramMap.get('noteId')
      this.getNoteDetails(nId)
    }
  }

  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  })

  onSubmit() {
    if (!this.isEdit) {
      this.service.setAction("Adding Note...")
      this.loading = true
      setTimeout(() => {
        this.service.addNote(this.noteForm.value).subscribe({
          next: (data: any) => {
            if (data.status) {
              this.loading = false
              this.toastr.success("Note Added !!!", "Success", { timeOut: 2500, closeButton: true })
              this.noteForm.reset()
              this.router.navigateByUrl('')
            } else {
              this.toastr.error('Internal Server Error ....', "Error", { timeOut: 2500, closeButton: true })
            }
          }
        })
      }, 1200);
    } else {
      this.service.setAction("Updating Note...")
      this.loading = true
      setTimeout(() => {
        let nId = this.activatedRoute.snapshot.paramMap.get('noteId')
        this.service.updateNote(nId, this.noteForm.value).subscribe({
          next: (data: any) => {
            if (data.status) {
              this.loading = false
              this.toastr.success("Note Updated !!!", "Success", { timeOut: 2500, closeButton: true })
              this.noteForm.reset()
              this.router.navigateByUrl('')
            } else {
              this.toastr.error('Internal Server Error ....', "Error", { timeOut: 2500, closeButton: true })
            }
          }
        })
      }, 1200);
    }
  }

  getNoteDetails(noteId:any) {
    this.service.getNoteDetail(noteId).subscribe({
      next:(data: any) => {
        console.log(data)
        if (data.status) {
          this.noteForm.controls['title'].setValue(data.message.title)
          this.noteForm.controls['description'].setValue(data.message.description)
          this.noteForm.controls['category'].setValue(data.message.category)
        } else {
          this.toastr.error('Internal Server Error ....', "Error", { timeOut: 2500})
        }
      }
    })
  }

}
