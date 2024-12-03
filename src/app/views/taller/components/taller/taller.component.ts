import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Italler } from 'src/app/core/models/taller.model';
import { TallerService } from 'src/app/core/services/user/taller.service';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.scss'],
})
export class TallerComponent implements OnInit {
  taller: Italler[] = [];

  constructor(private TallerSrv: TallerService, private router: Router) {}

  ngOnInit() {
    // Suscribirse a los cambios en la lista de users
    this.TallerSrv.tallerSubject$.subscribe((taller) => {
      this.taller = taller;
    });

    // Cargar los users inicialmente
    this.TallerSrv.loadTaller();
  }

  async deleteTaller(tallerId: string) {
    try {
      await this.TallerSrv.deleteTaller(tallerId);
      console.log('Tarea eliminada');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  goToUpdatePage(tallerId: string) {
    this.router.navigate([`/updatetaller`, tallerId]);
  }
}