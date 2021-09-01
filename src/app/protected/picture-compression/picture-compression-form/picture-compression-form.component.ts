import { Component,EventEmitter,OnDestroy,OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PictureDownloadService } from 'src/app/core/services/picture/picture-download.service';

@Component({
  selector: 'pil-picture-compression-form',
  templateUrl: './picture-compression-form.component.html',
  styleUrls: ['./picture-compression-form.component.scss']
})
export class PictureCompressionFormComponent implements OnInit, OnDestroy {

  @Output() numberOfPicture = new EventEmitter<number>()

  // unsubscribe
  isPictureFilesEnd$ = new Subject();

  compressForm: FormGroup;
  isPictureFiles: boolean;
  isOperationInProgres: boolean;
  nomberOfPicturesSelected: number;

  constructor(
    private fb: FormBuilder,
    private pictureDownloadService: PictureDownloadService,
  ) { }

  ngOnInit(): void {
    // affichage du bouton submit
    this.pictureDownloadService.pictureFiles$.pipe(
      takeUntil(this.isPictureFilesEnd$),
      map(pictureFiles => {
        this.nomberOfPicturesSelected = pictureFiles? pictureFiles.length: 0;
        return !!pictureFiles
      })
    ).subscribe(
      isPictureFiles => this.isPictureFiles = isPictureFiles
    );
    
    this.compressForm = this.fb.group({
      ratio: ['',[]],
      files: this.fb.array([]),
    })
  }

  ngOnDestroy(): void {
    this.isPictureFilesEnd$.next();
  }
 
  get ratio() { return this.compressForm.get('ratio') as FormControl };
  get files(): FormArray { return this.compressForm.get('files') as FormArray};

  submit(): void {
    this.numberOfPicture.emit(this.nomberOfPicturesSelected);
  }
  
}
