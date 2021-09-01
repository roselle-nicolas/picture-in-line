import { Component, Input } from '@angular/core';
import { OperationService } from 'src/app/core/services/operation.service';
import { Folder } from 'src/app/shared/models/folder';

@Component({
  selector: 'pil-operation-list-folder',
  templateUrl: './operation-list-folder.component.html',
  styleUrls: ['./operation-list-folder.component.scss']
})
export class OperationListFolderComponent {

  @Input() folderPicture: Folder;

  constructor(
    private operationService: OperationService,
  ) { }

  changeCurrentFolder(): void {
     this.operationService.newCurrentFolder(this.folderPicture)
  }

}
