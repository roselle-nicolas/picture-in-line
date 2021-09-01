import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PictureDownloadService } from 'src/app/core/services/picture/picture-download.service';

@Component({
  selector: 'pil-picture-compression-list-item',
  templateUrl: './picture-compression-list-item.component.html',
  styleUrls: ['./picture-compression-list-item.component.scss']
})
export class PictureCompressionListItemComponent implements OnInit, OnDestroy {

  // unsubscribe
  pictureDownlodingEnd$ = new Subject();

  pictureDownloadingName: string | null;

  @Input() filename: string;
  
  constructor(
    private pictureDownloadService: PictureDownloadService,
    ) { }

  ngOnInit(): void {
    this.pictureDownloadService.pictureDownloding$.pipe(
      takeUntil(this.pictureDownlodingEnd$)
    ).subscribe(
      (pictureNameDowloading: string | null) => {
        this.pictureDownloadingName = pictureNameDowloading
      }
    )
  }

  ngOnDestroy(): void {
    this.pictureDownlodingEnd$.next();
  }

  deletePictureFile(filename: string): void {
    this.pictureDownloadService.deletePictureFile(filename);
  }

}
