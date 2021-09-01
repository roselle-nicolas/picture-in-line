import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PictureDownloadService } from 'src/app/core/services/picture/picture-download.service';

@Component({
  selector: 'pil-picture-compression-list',
  templateUrl: './picture-compression-list.component.html',
  styleUrls: ['./picture-compression-list.component.scss']
})
export class PictureCompressionListComponent implements OnInit {
  
  pictureFiles$: Observable<File[] | null>;

  constructor(
    private pictureDownloadService: PictureDownloadService,
  ) { }


  ngOnInit(): void {
    this.pictureFiles$ = this.pictureDownloadService.pictureFiles$;
  }

}
