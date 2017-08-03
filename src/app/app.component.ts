import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  my_notes = [
    {
      id: 1,
      title: 'Note 1',
      description: 'This is description'
    },
    {
      id: 2,
      title: 'Note 1',
      description: 'This is description'
    },
    {
      id: 3,
      title: 'Note 1',
      description: 'This is description'
    },
    {
      id: 4,
      title: 'Note 1',
      description: 'This is description'
    }
  ];

  note = { id: null, title: null, description: null };

  show_form = false;

  editing = false;

  addNote() {
    this.show_form = true;
    this.editing = false;
  }

  viewNote(note: any) {
    this.show_form = true;
    this.editing = true;
    this.note = note;
  }

  cancel() {
    this.show_form = false;
  }

  delete() {
    const ME = this;
    this.my_notes.forEach(function (element, index) {
      if (element.id === ME.note.id) {
        ME.my_notes.splice(index, 1);
      }
    });
    this.show_form = false;
    this.note = { id: null, title: null, description: null };
  }

  createNote() {
    if (this.editing) {
      const ME = this;
      this.my_notes.forEach(function (element, index) {
        if (element.id === ME.note.id) {
          ME.my_notes[index] = ME.note;
        }
      });
      this.show_form = false;
    } else {
      this.note.id = new Date();
      this.my_notes.push(this.note);
      this.show_form = false;
      this.note = { id: null, title: null, description: null };
    }
  }
}
