import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: IUser[] = [];

  constructor(private UserSrv: UserService, private router: Router) {}

  ngOnInit() {
    // Suscribirse a los cambios en la lista de users
    this.UserSrv.usersSubject$.subscribe((users) => {
      this.users = users;
    });

    // Cargar los users inicialmente
    this.UserSrv.loadTasks();
  }

  async deleteUser(userId: string) {
    try {
      await this.UserSrv.deleteUser(userId);
      console.log('Tarea eliminada');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  }

  goToUpdatePage(userId: string) {
    this.router.navigate([`/updateuser`, userId]);
  }
}
