import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { OperationService } from 'src/app/core/services/operation.service';
import { WebSocketService } from 'src/app/core/services/web-socket.service';
import { DataSocket } from 'src/app/shared/models/data-socket';

@Component({
  selector: 'pil-picture-compression',
  templateUrl: './picture-compression.component.html',
  styleUrls: ['./picture-compression.component.scss']
})
export class PictureCompressionComponent implements OnInit, OnDestroy {

  // unsubscribe
  private startOperationCompressEnd$ = new Subject();
 
  constructor(
    private webSocketService: WebSocketService,
    private operationService: OperationService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.operationService.resetCompressPicture()

    // webSocket: opération autorisé: retour de l'identifiant de l'opération de compression d'image
    this.operationService.compressOperationId$.pipe(
      takeUntil(this.startOperationCompressEnd$),
    ).subscribe(
      compressOperationId => {
        if (compressOperationId) {
          this.router.navigate(['picinline/operation'])
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.startOperationCompressEnd$.next();
  }

  startCompressOperation(nomberOfPicturesSelected: number): void {
    const user = this.authService.currentUser;
    if (!user || !user.id) return
    
    this.webSocketService.connect();
    // webSocket: demande d'une opération de compression au serveur.
    const dataRequestCompressOperation: DataSocket = {
      startCompressFiles: {
        numberOfPictures: nomberOfPicturesSelected,
        user_id: user.id
      }
    }
    this.webSocketService.sendData(dataRequestCompressOperation);
  }
}
