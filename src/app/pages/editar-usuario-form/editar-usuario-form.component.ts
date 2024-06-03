import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditarFormComponent } from '../editar-form/editar-form.component';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/services/interfaces/usuario';

@Component({
  selector: 'app-editar-usuario-form',
  templateUrl: './editar-usuario-form.component.html',
  styleUrls: ['./editar-usuario-form.component.css']
})
export class EditarUsuarioFormComponent {
  editarUsuarioForm: FormGroup;
  usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarFormComponent>,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.usuario = data.Usuario;
    
    this.editarUsuarioForm = this.fb.group({
      ID_Usuario: [this.usuario.ID_Usuario, Validators.required],
      Nombre: [this.usuario.Nombre, Validators.required],
      Correo: [this.usuario.Correo, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      Objetivo: [this.usuario.Objetivo_Gasto, Validators.required],
    });
  }

  editarUsuario(){
    console.log("Editar usuario");
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
