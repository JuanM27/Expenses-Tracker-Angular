import { Component, Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-borrar',
  templateUrl: './modal-borrar.component.html',
  styleUrls: ['./modal-borrar.component.css']
})
export class ModalBorrarComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalBorrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
