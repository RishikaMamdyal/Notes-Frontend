import { Component } from '@angular/core';
import { NoteService } from '../../Services/notes.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  constructor(public service:NoteService){}

}
