import { Component, EventEmitter, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { FolderService } from 'src/app/core/services/folder.service';
import { OperationService } from 'src/app/core/services/operation.service';


@Component({
  selector: 'pil-operation-folder-navigation',
  templateUrl: './operation-folder-navigation.component.html',
  styleUrls: ['./operation-folder-navigation.component.scss']
})
export class OperationFolderNavigationComponent {
 
  @Output() toggleFormAddFolder = new EventEmitter<boolean>();

  constructor(
    private operationService: OperationService,
    private folderService: FolderService,
  ) { }

  addFolder(): void {
    this.toggleFormAddFolder.emit(true)
  }

  backFolder(): void {
    // récupère le dossier courant
    this.operationService.currentFolder$.pipe(take(1)).subscribe(currentFolder => {
        if (currentFolder?.repository_parent_id || currentFolder?.repository_parent_id === null) {
          // récupère le dossier parent depuis le serveur
          this.folderService.getFolder(currentFolder?.repository_parent_id)
            .subscribe(newCurrentFolder => { // met à jout le nouveau dossier courant
              this.operationService.newCurrentFolder(newCurrentFolder)
            });
        }
    });
  }

  backAllFolder(): void {
    this.operationService.newCurrentFolder(null)
  }

}
