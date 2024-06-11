import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { AnadirCategoriaFormComponent } from '../anadir-categoria-form/anadir-categoria-form.component';
import { Subscription } from 'rxjs';
import { EditarCategoriaFormComponent } from '../editar-categoria-form/editar-categoria-form.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})

export class CategoriasComponent {
  categorias: Categoria[];
  
  categoriaAnadidaSubscription: Subscription;
  categoriaEditadaSubscription: Subscription;
  categoriaBorradaSubscription: Subscription;

  constructor(
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.obtenerCategorias();

    this.categoriaService.categoriaAnadida$.subscribe(() => {
      this.obtenerCategorias(); 
    });

    this.categoriaService.categoriaEditada$.subscribe(() => {
      this.obtenerCategorias(); 
    });

    this.categoriaService.categoriaBorrada$.subscribe(() => {
      this.obtenerCategorias(); 
    });

  }

  ngOnDestroy(): void {
    if (this.categoriaAnadidaSubscription) {
      this.categoriaAnadidaSubscription.unsubscribe();
    }

    if (this.categoriaBorradaSubscription) {
      this.categoriaBorradaSubscription.unsubscribe();
    }

    if (this.categoriaEditadaSubscription) {
      this.categoriaEditadaSubscription.unsubscribe();
    }
  }

  obtenerCategorias(){
    this.categoriaService.obtenerCategorias().subscribe((response) => {
      this.categorias = response.data;
    });
  }

  borrarCategoria(idCategoria:number){
    this.categoriaService.borrarCategoria(idCategoria).subscribe((response) => {
      if(response.message == 'Categoria eliminada correctamente'){
      this.toastr.success('Categoria borrada correctamente', 'Categoria borrada')
      }else{
        this.toastr.error('Error al borrar la categoria', 'Error')
      }
    });
  }

  abrirModalAnadirCategoria(){// Abre el modal
    const dialogRef = this.dialog.open(AnadirCategoriaFormComponent, {
      width: '400px', // Establece el ancho del modal
    });

    // Escucha el evento de cierre del modal (puede ser útil si necesitas hacer algo después de cerrar el modal)
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  abrirModalEditarCategoria(categoria:Categoria): void {
    // Abre el modal
    const dialogRef = this.dialog.open(EditarCategoriaFormComponent, {
      width: '400px',
      data: { Categoria: categoria }  // Establece el ancho del modal
    });

    // Escucha el evento de cierre del modal (puede ser útil si necesitas hacer algo después de cerrar el modal)
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
  

