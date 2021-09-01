import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { MessageInfoService } from './message-info.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private messageinfoService: MessageInfoService,
  ) { }

  handleError(error: any) {

    if(error.error.message)
    {
      this.messageinfoService.showMessageInfo({
        category: 'error',
        message: error.error.message,
      })
      return throwError(error);
    }

    if (error.status === 404 || error.status === 400) {
      this.messageinfoService.showMessageInfo({
        category: 'error',
        message: 'requête incorect, veillez contacter l\'administrateur de l\'application.',
      })
      return throwError(error);
    }
    
    if (error.status === 401) {
      this.messageinfoService.showMessageInfo({
        category: 'error',
        message: 'connexion périmée. veyez vous reconnecter',
      })
      return throwError(error);
    }
    
    this.messageinfoService.showMessageInfo({
      category: 'error',
      message: 'erreur non prise en charge, veillez contacter l\'administrateur de l\'application',
    })
    return throwError(error);
   }
}
