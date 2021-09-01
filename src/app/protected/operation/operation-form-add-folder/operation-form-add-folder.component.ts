import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { FolderService } from 'src/app/core/services/folder.service';
import { OperationService } from 'src/app/core/services/operation.service';

@Component({
  selector: 'pil-operation-form-add-folder',
  templateUrl: './operation-form-add-folder.component.html',
  styleUrls: ['./operation-form-add-folder.component.scss']
})
export class OperationFormAddFolderComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private folderService: FolderService,
    private operationService: OperationService,
  ) { }

  folderForm: FormGroup

  ngOnInit(): void {
    this.folderForm = this.fb.group(
      {
        'name': ['', [Validators.pattern(/^[a-zA-Z-]{1,20}$/)]]
      }
    )
  }

  get name() { return this.folderForm.get('name') as FormControl }

  submit(): void {
    this.operationService.currentFolder$.pipe(take(1)).subscribe(
      // récupère le dossier courant
      currentFolder => {
        // ajout d'un sous dossier sur le serveur
        this.folderService.addFolder(this.name.value, currentFolder?._id).subscribe(
          _ => {
                // rafraichissement de l'affichage des sous dossiers
                this.operationService.newCurrentFolder(currentFolder);
                // effacement du formulaire: ajout de dossier
                this.operationService.resetFormAddFolder();
          }
        )
      }
    )
  }

}
