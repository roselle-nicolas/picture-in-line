import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { OperationService } from 'src/app/core/services/operation.service';
import { Observable, Subject } from 'rxjs';
import { Picture } from 'src/app/shared/models/picture';
import { take, takeUntil } from 'rxjs/operators';
import { WebSocketService } from 'src/app/core/services/web-socket.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MessageInfoService } from 'src/app/core/services/message-info.service';
import { Folder } from 'src/app/shared/models/folder';
import { FolderService } from 'src/app/core/services/folder.service';
import { PictureService } from 'src/app/core/services/picture/picture.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PictureSelectedService } from 'src/app/core/services/picture/picture-selected.service';
import { PictureDownloadService } from 'src/app/core/services/picture/picture-download.service';
import { User } from 'src/app/shared/models/user';
@Component({
  selector: 'pil-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit, OnDestroy {

  // unsubscribe
  otherDataSocketEnd$        = new Subject();
  compressictureEnd$         = new Subject();
  rankingPicturesEnd$        = new Subject();
  subfoldersPictureEnd$      = new Subject();
  currentFolderEnd$          = new Subject();
  startOperationCompressEnd$ = new Subject();

  rankingPictureHidden$: Observable<boolean>;
  compressPictures     : Picture[];
  rankingPictures      : Picture[];
  subfoldersPicture    : Folder[];
  showFormAddFolder$   : Observable<boolean>;
  currentFolder        : Folder | null; 

  constructor(
    private operationService       : OperationService,
    private webSocketService       : WebSocketService,
    private loaderService          : LoaderService,
    private messageInfoService     : MessageInfoService,
    private folderService          : FolderService,
    private pictureService         : PictureService,
    private authServcie            : AuthService,
    private picturesSelectedService: PictureSelectedService,
    private pictureDownloadService : PictureDownloadService,
    private authService            : AuthService,
  ) { }

  ngOnInit(): void {

    this.loaderService.setLoading(false);
    this.showFormAddFolder$ = this.operationService.showFormAddFolder$;

    // WebSocket: opération autorisé: récupération d'un n° d'identifiant => début du téléchargement d'images. 
    this.operationService.compressOperationId$.pipe(
      takeUntil(this.startOperationCompressEnd$),
    ).subscribe(
      compressOperationId => {
        if (compressOperationId) this.downloadPictures(compressOperationId);
      }
    )

    //récupération du dossier courant
    this.operationService.currentFolder$.pipe(
      takeUntil(this.currentFolderEnd$)
    ).subscribe(
      currentFolder => {
        this.currentFolder = currentFolder;

        const folderParent_id =
          this.currentFolder == null || this.currentFolder._id == null ? null : this.currentFolder._id

        this.folderService.getSubfolderFolderSelected({
          folderParent_id ,
          project_id: null
        }).subscribe(
          subFolder => this.operationService.newSubfoldersPicture(subFolder)
        )
        //récupère les images du dossier courant
        const user = this.authServcie.currentUser

        this.pictureService.getPicturesByFolder(currentFolder, user?.id!)
        .subscribe( pictures =>
          this.operationService.newRankingPictures(pictures.length === 0? null : pictures)
        );
      } 
    )

    // initialisation: affichage de la section: classement des images par dossier
    this.rankingPictureHidden$ = this.operationService.rankingPictureHidden$;

    // récupère les images qui viennent d'être compressées
    this.operationService.compressPictures$
      .pipe(takeUntil(this.compressictureEnd$))
      .subscribe(compressPictures =>
        this.compressPictures = compressPictures? compressPictures : []
      );

    // récupération des sous dossiers d'un dossier selectionnés
    this.operationService.subfoldersPicture$
      .pipe(takeUntil(this.subfoldersPictureEnd$))
      .subscribe(subfolders =>
        this.subfoldersPicture = subfolders? subfolders: []
      );

    // récupération des images d'un dossier ou sous dossier selectionné
    this.operationService.rankingPictures$
      .pipe(takeUntil(this.rankingPicturesEnd$))
      .subscribe(rankingPictures =>
         this.rankingPictures = rankingPictures? rankingPictures: []
      );

    //autre data webSocket
    this.webSocketService.otherDataSocket$.pipe(takeUntil(this.otherDataSocketEnd$))
      .subscribe(data => {
        // fin de la compression des images
        if (data && data.compressAllPicturesFinish) {
          this.webSocketService.disconnect();
          this.messageInfoService.showMessageInfo({
            category: 'success',
            message: 'compression terminée'
          })
          // préparation pour une autre opération de compression d'image.
          this.operationService.resetCompressOperationId();
          this.pictureDownloadService.resetPictureFiles();
          this.webSocketService.resetOtherDataSocket();
        }
      }
    )

  }

  ngOnDestroy(): void {
    this.compressictureEnd$.next();
    this.otherDataSocketEnd$.next();
    this.rankingPicturesEnd$.next();
    this.subfoldersPictureEnd$.next();
    this.subfoldersPictureEnd$.next();
    this.startOperationCompressEnd$.next();
  }

  private tranferPictureSelected(repository_id: string, projectId: string, pictureDrop: Picture): void {
    // mise à jour de l'image sur le serveur et fin de l'opération de compression de l'image
    this.pictureService.updatePicture(repository_id, projectId, pictureDrop)
      .subscribe(_ => {
        this.operationService.addNewRankingPicture(pictureDrop);
        this.operationService.deleteOneCompressPicture(pictureDrop);
        this.picturesSelectedService.deletePictureSelected(pictureDrop);
      }
    )
  }

  downloadPictures(compressPictureId: string) {
    this.messageInfoService.showMessageInfo({
      category: 'info',
      message: 'téléchargement des images...'
    })

    const user: User | null = this.authService.currentUser;
    const userId = user && user.id ? user.id : '';
    
    this.pictureDownloadService.downloadPicture(compressPictureId, userId);
  }

  // affichage de la section: classement des images
  rankingPictureHidden(status: boolean): void {
    this.operationService.hiddenRankingPicture(status)
  }

  // gestion du drag and drop: classement des images dans leur dossier respectif.
  drop(event: CdkDragDrop<Picture[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const drop = event.container.element.nativeElement.parentElement?.className;
      const pictureDrop = event.previousContainer.data[0];
      
      //drop d'image(s) dans un dossier
      if (drop === 'ranking-picture') {
        // récupère l'identifiant du dossier courant
        this.operationService.currentFolder$.pipe(take(1))
        .subscribe(folder => {
            const projectId = "_null";
            const repository_id = folder && folder._id ? folder._id : '_null'

            // si d'autre images ont été selectionnées
            this.picturesSelectedService.picturesSelected$.pipe(take(1))
              .subscribe(picturesSelected => picturesSelected ? 
                picturesSelected.map(picture => this.tranferPictureSelected(repository_id, projectId, picture)) :
                this.tranferPictureSelected(repository_id, projectId, pictureDrop)
              );
        });
      }
    }
  }

  saveCompressPicture(): void {
    this.picturesSelectedService.picturesSelected$.pipe(take(1))
      .subscribe(picturesSelected => {
        if (picturesSelected) { // sauvegarde des images selectionnées
          for (let picture of picturesSelected) {
            this.operationService.saveCompressPicture(picture);
            this.picturesSelectedService.deletePictureSelected(picture);
          }
        }else { // sauvegarde de toutes les images
          this.compressPictures.map(picture => this.operationService.saveCompressPicture(picture))
        }
      }
    )
  }

  cancelOperationCompress(): void {
    this.picturesSelectedService.picturesSelected$.pipe(take(1))
      .subscribe(picturesSelected => {
        if (picturesSelected) { // annule les images selectionnées
          for (const picture of picturesSelected) {
            this.operationService.deletePicture(picture);
            this.picturesSelectedService.deletePictureSelected(picture);
          }
        }else if (this.compressPictures) { // annule toutes les images compressées
          this.compressPictures.map(picture => this.operationService.deletePicture(picture))
        }
      }
    );
  }

  toggleFormAddFolder(): void {
    this.operationService.toggleFormAddFolder();
  }

}
