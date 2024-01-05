import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private firestore: AngularFirestore
  ) {}

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
    if (huecaId) {
      // Realizar la navegación solo si huecaId no es null ni undefined
      this.router.navigate(['/editarHueca', huecaId]);
    } else {
      console.error('El huecaId es null o undefined en editarHueca.');
    }
  }

  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
