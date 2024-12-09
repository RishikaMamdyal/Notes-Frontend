import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private loadingAction = "Loading..."
  setAction(loadingAction:any){
    this.loadingAction = loadingAction
  }
  getAction(){
    return this.loadingAction
  }


  constructor(private http:HttpClient) { }

  getAllNote():Observable<any>{
    return this.http.get('https://notes-backend-delta-snowy.vercel.app/note/getNote')
  }

  addNote(noteForm:any):Observable<any>{
    return this.http.post('https://notes-backend-delta-snowy.vercel.app/note/addNote',noteForm)
  }

  getNoteDetail(id:any):Observable<any>{
    return this.http.get(`https://notes-backend-delta-snowy.vercel.app/note/getNote/${id}`)
  }

  updateNote(id:any,noteForm:any):Observable<any>{
    return this.http.put(`https://notes-backend-delta-snowy.vercel.app/note/updateNote/${id}`,noteForm)
  }

  deleteNote(id:any):Observable<any>{
    return this.http.delete(`https://notes-backend-delta-snowy.vercel.app/note/deleteNote/${id}`)
  }

}