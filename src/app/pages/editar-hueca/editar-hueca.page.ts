import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-hueca',
  templateUrl: './editar-hueca.page.html',
  styleUrls: ['./editar-hueca.page.scss'],
})
export class EditarHuecaPage implements OnInit {
  huecaForm: FormGroup;
  huecaId: string | null;
  imagen: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.huecaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: [''],
      imagen: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.huecaId = params.get('huecaId');
      this.cargarDatosHueca();
    });
  }

  cargarDatosHueca() {
    if (this.huecaId) {
      this.afs.collection('huecas').doc(this.huecaId).valueChanges().subscribe((data: any) => {
        this.huecaForm.patchValue({
          titulo: data.titulo,
          descripcion: data.descripcion,
          imagen: data.imagen,
        });
      });
    }
  }

  guardar() {
    if (this.huecaForm.valid && this.huecaId) {
      const { titulo, descripcion, imagen } = this.huecaForm.value;
      this.afs.collection('huecas').doc(this.huecaId).update({
        titulo: titulo,
        descripcion: descripcion,
        imagen: imagen,
      })
      .then(() => {
        console.log('Hueca actualizada correctamente');
      })
      .catch(error => {
        console.error('Error al actualizar la hueca:', error);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/home']);
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.imagen = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

}