import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditarFormComponent } from '../editar-form/editar-form.component';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/services/interfaces/usuario';
import { Subscription } from 'rxjs';

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
    const usuario = this.editarUsuarioForm.value;
    this.usuarioService.editarUsuario(usuario).subscribe(
      (response: any) => {
        console.log(response);
        if(response.mensaje==="Usuario actualizado correctamente"){
          this.toastr.success('Usuario actualizado correctamente', 'Usuario actualizado');
          this.dialogRef.close();
        }else{
          this.toastr.error('Error al actualizar el usuario', 'Error');
        }
      },
      (error) => {
        this.toastr.error('Error al actualizar el usuario', 'Error');
      }
    );
  }

  borrarUsuario(){
    const idUsuario = this.editarUsuarioForm.value.ID_Usuario;
    this.usuarioService.borrarUsuario(idUsuario).subscribe(
      (response: any) => {
        if(response.mensaje==="Usuario eliminado correctamente"){
          this.toastr.success('Usuario eliminado correctamente', 'Usuario eliminado');
          this.dialogRef.close();
        }else{
          this.toastr.error('Error al eliminar el usuario', 'Error');
        }
      },
      (error) => {
        this.toastr.error('Error al eliminar el usuario', 'Error');
      }
    );
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
