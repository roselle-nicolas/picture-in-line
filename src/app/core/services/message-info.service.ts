import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { MessageInfo } from 'src/app/shared/models/message-info';

@Injectable({
  providedIn: 'root'
})
export class MessageInfoService {

  private messageInfo = new BehaviorSubject<MessageInfo | null>(null);
  readonly messageInfo$ = this.messageInfo.asObservable();

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  private getEmojiCategory(category: string): string {
    switch (category) {
      case 'success':
        return '✔️'
      case 'info':
        return '💁🏼‍♂️'
      case 'danger':
        return '⚠️'
      case 'error':
        return '❌'
   
      default:
        return '💁🏼‍♂️'
    }
  }

  showMessageInfo(messageInfo: MessageInfo): void {
    this._snackBar.open(messageInfo.message, this.getEmojiCategory(messageInfo.category),{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
