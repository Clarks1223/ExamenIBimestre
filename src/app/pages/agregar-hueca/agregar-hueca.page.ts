import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-hueca',
  templateUrl: 'agregar-hueca.page.html',
  styleUrls: ['agregar-hueca.page.scss'],
})
export class AgregarHuecaPage {
  imagen: string | undefined;
  descripcion: string = '';
  titulo: string = '';

  constructor(private afs: AngularFirestore,
    private router: Router,
    private toastController: ToastController,) { }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });

    this.imagen = `data:image/jpeg;base64,${image.base64String}`;
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

  guardar() {
    //Validación de campos
    if (this.camposInvalidos()) {
      let errorMessage = 'Los campos de descripción, título e imagen no deben estar vacíos';
      this.presentToast(errorMessage);
      return;
    }

    const huecaId = this.afs.createId();

    //Guarda la información en Firestore
    this.afs.collection('huecas').doc(huecaId).set({
      id: huecaId,
      imagen: this.imagen,
      descripcion: this.descripcion,
      titulo: this.titulo,
    })
      .then(() => {
        let exitoMessage = 'Hueca guardada correctamente';
        this.presentToast(exitoMessage);
        this.resetValues();
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error al guardar la hueca en Firestore:', error);
      });
  }

  camposInvalidos(): boolean {
    return !this.titulo || !this.descripcion || !this.imagen || this.imagen === 'https://i0.wp.com/zoomempresarial.pe/wp-content/uploads/2019/10/barrio-miraflores-interior-min.jpg?resize=723%2C482&ssl=1';
  }

  cancelar() {
    this.resetValues();
    this.router.navigate(['/home']);
  }

  resetValues() {
    this.imagen = undefined;
    this.descripcion = '';
    this.titulo = '';
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