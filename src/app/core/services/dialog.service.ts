import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogData } from 'src/app/shared/models/dialogData';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  comfirAction(data: DialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { ...data }
    });

    return dialogRef.afterClosed();
  }
}
