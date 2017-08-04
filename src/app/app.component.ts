import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  show_form = false;
  editing = false;
  my_notes: any;
  my_notes_offline = [];

  constructor(private afDB: AngularFireDatabase) {
    if (navigator.onLine) {
      this.getNotes()
        .subscribe(
          (notes) => {
            this.my_notes = notes;
            localStorage.setItem('my_notes', JSON.stringify(this.my_notes));
          }
        );
    } else {
      this.my_notes = JSON.parse(localStorage.getItem('my_notes'));
    }

    setInterval( () => {
      if (navigator.onLine) {
        if (this.my_notes_offline.length > 0) {
          this.syncronize();
          console.log('Hemos syncronizado los datos');
        }
      }else{
        console.log('Offline!');
      }
    }, 5000);
  }

  note: any = { id: null, title: null, description: null };

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
    this.note = { id: null, title: null, description: null };
  }

   /*
    //delete() {
    //const ME = this;
    // this.my_notes.forEach(function (element, index) {
    //   if (element.id === ME.note.id) {
    //     ME.my_notes.splice(index, 1);
    //   }
    // });
    //this.show_form = false;
   // this.note = { id: null, title: null, description: null };
  // }
  */

  /*
    // if (this.editing) {
    //   const ME = this;
    //   this.my_notes.forEach(function (element, index) {
    //     if (element.id === ME.note.id) {
    //       ME.my_notes[index] = ME.note;
    //     }
    //   });
    // } else {
    //   this.note.id = new Date();
    //   this.my_notes.push(this.note);
    //   this.show_form = false;
    //   this.note = { id: null, title: null, description: null };
    // }
   */

  createNote() {
    if (!this.editing) {
      this.note.id = Date.now();
    }
    if (navigator.onLine) {
      this.afDB.database.ref('notes/' + this.note.id).set(this.note);
    } else {
      // tslint:disable-next-line:prefer-const
      let action = 'create';
      if (this.editing) {
        this.my_notes.forEach( (note) => {
          if (note.id === this.note.id) {
            note = this.note;
            action = 'edit';
          }
        });
      } else {
        this.my_notes.push(this.note);
      }
      this.my_notes_offline.push({
        'id': this.note.id,
        'note': this.note,
        'action': action
      });
    }
    this.show_form = false;
    this.note = { id: null, title: null, description: null };
    localStorage.setItem('my_notes', JSON.stringify(this.my_notes));
  }

  getNotes() {
    return this.afDB.list('/notes');
  }

  removeNotes() {
    if (navigator.onLine) {
      this.afDB.database.ref('notes/' + this.note.id).remove();
    } else {
      this.my_notes.forEach((note, i) => {
        if (note.id === this.note.id) {
          this.my_notes.splice(i, 1);
          this.my_notes_offline.push({
            'id': this.note.id,
            'action': 'delete'
          });
        }
      });
    }
    this.show_form = false;
    this.note = { id: null, title: null, description: null };
    localStorage.setItem('my_notes', JSON.stringify(this.my_notes));
  }

  syncronize() {
    this.my_notes_offline.forEach(record => {
      switch (record.action) {
        case 'create':
          this.afDB.database.ref('notes/' + record.id).set(record.note);
          break;
        case 'edit':
          this.afDB.database.ref('notes/' + record.id).set(record.note);
          break;
        case 'delete':
          this.afDB.database.ref('notes/' + record.id).remove();
          break;
        default:
          console.log('operación no soportada ' + record);
          break;
      }
    });

    this.my_notes_offline = [];
  }

}
