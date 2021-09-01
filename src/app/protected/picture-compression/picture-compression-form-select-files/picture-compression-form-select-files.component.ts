import { Component } from '@angular/core';
import { PictureDownloadService } from 'src/app/core/services/picture/picture-download.service';

@Component({
  selector: 'pil-picture-compression-form-select-files',
  templateUrl: './picture-compression-form-select-files.component.html',
  styleUrls: ['./picture-compression-form-select-files.component.scss']
})
export class PictureCompressionFormSelectFilesComponent {

  constructor(
    private pictureDownloadService: PictureDownloadService,
  ) { }

  detectFiles(event: any): void {
    let pictureFiles = event.target.files;
    if (pictureFiles) {
      this.pictureDownloadService.addPictureFiles(pictureFiles);
    }
  }

}
