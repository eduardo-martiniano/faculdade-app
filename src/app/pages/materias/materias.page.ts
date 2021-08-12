import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  materias = [];

  constructor(private actionSheetController: ActionSheetController,
              private navCtrl: NavController,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() =>
    this.storageService.getMaterias().then(materias_salvas => this.materias = materias_salvas));
  }

  async presentActionSheet(materia) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Apagar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Configurar horarios',
        icon: 'share',
        handler: () => {
          this.router.navigate(['add-horarios/' + materia.id]);
        }
      }, {
        text: 'Editar',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
