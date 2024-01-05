import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: any;
  emailTouched: boolean = false;  // Asegúrate de inicializar la variable.
  
  // Definir la propiedad emailValid.
  get emailValid(): boolean {
    return this.email && this.email.trim() !== '';
  }

  constructor(
    private authService: AuthServiceService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  reset() {
    if (!this.emailValid) {
      this.presentToast('Ingrese su correo electrónico.');
      return;
    }

    this.authService.resetPassword(this.email)
      .then(() => {
        console.log('Link de restablecimiento de contraseña enviado.');
        this.presentToast('El link para restablecer su contraseña se ha enviado a su correo.');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error durante el restablecimiento de contraseña:', error);

        let errorMessage = 'Ocurrió un error durante el restablecimiento de contraseña.';
        this.presentToast(errorMessage);
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'bottom',
    });

    toast.present();
  }
}