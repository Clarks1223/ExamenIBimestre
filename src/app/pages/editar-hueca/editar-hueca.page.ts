import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-hueca',
  templateUrl: './editar-hueca.page.html',
  styleUrls: ['./editar-hueca.page.scss'],
})
export class EditarHuecaPage implements OnInit {
  huecaId: string | null;
  imagen: string | undefined;
  titulo: string | undefined;
  descripcion: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.huecaId = params.get('huecaId');
      this.cargarDatosHueca();
    });
  }

  cargarDatosHueca() {
    if (this.huecaId) {
      this.afs.collection('huecas').doc(this.huecaId).valueChanges().subscribe((data: any) => {
        if (data) {
          this.titulo = data.titulo;
          this.descripcion = data.descripcion;
          this.imagen = data.imagen;
        }
      });
    }
  }

  guardar() {
    if (this.camposInvalidos()) {
      let errorMessage = 'Los campos de descripción y título no deben estar vacíos';
      this.presentToast(errorMessage);
      return;
    }

    if (this.huecaId) {
      const huecaRef = this.afs.collection('huecas').doc(this.huecaId);

      huecaRef.update({
        titulo: this.titulo,
        descripcion: this.descripcion,
        imagen: this.imagen,
      })
        .then(() => {
          console.log('Hueca actualizada correctamente');
          let mensaje = 'La información se ha actualizado correctamente';
          this.presentToast(mensaje);
          this.router.navigate(['/home']);
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

  camposInvalidos(): boolean {
    return !this.titulo || !this.descripcion || !this.imagen;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3500,
      position: 'bottom',
    });

    toast.present();
  }

}