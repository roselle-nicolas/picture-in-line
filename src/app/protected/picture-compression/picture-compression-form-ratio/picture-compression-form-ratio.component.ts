import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PictureDownloadService } from 'src/app/core/services/picture/picture-download.service';

@Component({
  selector: 'pil-picture-compression-form-ratio',
  templateUrl: './picture-compression-form-ratio.component.html',
  styleUrls: ['./picture-compression-form-ratio.component.scss']
})
export class PictureCompressionFormRatioComponent implements OnInit, OnDestroy {

  @Input() ratio: FormControl;

  //unsubscribe
  globalRatioEnd$ = new Subject();

  ratioValue : number;

  constructor(
    private pictureDownloadService: PictureDownloadService,
  ) { }

  ngOnInit(): void {
    this.pictureDownloadService.globalRatio$.pipe(
      takeUntil(this.globalRatioEnd$)
    ).subscribe(
      ratio => this.ratioValue = ratio
    )
  }

  ngOnDestroy(): void {
    this.globalRatioEnd$.next();
  }

  onChange(event: any): void {
    this.pictureDownloadService.changeRatio(event.value)
  }

}
