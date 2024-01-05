import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  email: any;
  huecas: any[] = [];

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private firestore: AngularFirestore,
    private toastController: ToastController,
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().then((user) => {
      this.email = user?.email;
      console.log(user);
      //Carga datos desde Firestore
      this.cargarRestaurantes();
    });
  }

  cargarRestaurantes() {
    this.firestore.collection('huecas').valueChanges().subscribe((data) => {
      this.huecas = data as any[];
    });
  }

  agregarHueca() {
    this.router.navigate(['/agregar-hueca']);
  }

  editarHueca(huecaId: string) {
    this.router.navigate(['/editar-hueca', huecaId]);
  }

  eliminarHueca(huecaId: string) {
    if (huecaId) {
      this.firestore.collection('huecas').doc(huecaId).delete()
        .then(() => {
          console.log('Hueca eliminada con éxito');
          let mensaje = 'La hueca se ha eliminado correctamente';
          this.presentToast(mensaje);
        })
        .catch((error) => {
          console.error('Error al eliminar hueca:', error);
        });
    } else {
      console.error('El huecaId es null o undefined en eliminarHueca.');
    }
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
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
