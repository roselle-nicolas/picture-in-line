import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { delayWhen, retryWhen, take, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { DataSocket } from 'src/app/shared/models/data-socket';
import { Picture } from 'src/app/shared/models/picture';
import { environment } from 'src/environments/environment';
import { OperationService } from './operation.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private subscriptionWebSocket = new BehaviorSubject<Subscription | null>(null);
  readonly subscriptionWebSocket$ = this.subscriptionWebSocket.asObservable();

  // connexion webSocket
  private webSocket: WebSocketSubject<any> = this.getNewWebSocket();
  readonly webSocket$ = this.webSocket.asObservable()

  // autre données webSoket, non dispaché
  private otherDataSocket = new BehaviorSubject<DataSocket | null>(null);
  readonly otherDataSocket$ = this.otherDataSocket.asObservable();

    
  constructor(
     private operationService: OperationService,
  ) { }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: environment.WS_ENDPOINT,
      openObserver: {
        next: () => console.log('[service websocket]: connexion')
      },
      closeObserver: {
        next: () => console.log('[service websocket]: déconexion')
      },
    });
  }

  connect() {
    this.subscriptionWebSocket$.pipe(take(1)).subscribe(
      subsciptionWebSocket => {
        if (!subsciptionWebSocket) this.newConnection();
      }
    )
   
  }

  newConnection(): void {
    const newSocket$ = this.webSocket$.pipe(
      retryWhen(errors => errors.pipe(
        tap(_ => console.log('[service websocket]: tentative de reconnexion')),
        delayWhen(_ => timer(2000))
      ))
    );
    
    this.subscriptionWebSocket.next(
      newSocket$.subscribe(
        data => {
          this.dataDispatcher(data);
          console.log('[websocket service]: reception d\'une donnée - ', data);
        }
      )
    ) 
  }

  disconnect(): void {
    this.subscriptionWebSocket$.pipe(
      take(1),
    ).subscribe(
      subscriptionWebSocket=> {
        if(subscriptionWebSocket) {
          subscriptionWebSocket.unsubscribe();
          this.subscriptionWebSocket.next(null);
        }
      }
    )
  }

  dataDispatcher(data: DataSocket): void {
     // starCompressFiles
    data.startCompressFiles? this.operationService.addNewCompressOperationId(data) : false;
    // downloadAllPicturesFinish
    data.downloadAllPicturesFinish? this.otherDataSocket.next(data): false;
    // conpressOnePictureFinish
    data.conpressOnePictureFinish? this.operationService.addNewCompressPicture(new Picture(data.conpressOnePictureFinish)): false;
    // compressAllPicturesFinish
    data.compressAllPicturesFinish? this.otherDataSocket.next(data) : false;
  }

  resetOtherDataSocket(): void {
    this.otherDataSocket.next(null);
  }

  sendData(data: any) {
    this.webSocket.next(data)
  }
}
