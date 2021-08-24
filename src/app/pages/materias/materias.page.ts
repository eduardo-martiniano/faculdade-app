import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Materia } from 'src/app/models/materia.model';
import { HorarioService } from 'src/app/services/horario.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  materias = [];

  constructor(private actionSheetController: ActionSheetController,
    private storageService: StorageService,
    private toastService: ToastService,
    private alertController: AlertController,
    private horarioService: HorarioService,
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() =>
      this.storageService.getMaterias().then(materias_salvas => this.materias = materias_salvas));
  }

  ionViewWillEnter() {
    this.storageService.getMaterias().then(materias_salvas => this.materias = materias_salvas);
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
          this.abrirAlertarDeletar(materia);
        }
      }, {
        text: 'Configurar horarios',
        icon: 'stopwatch',
        handler: () => {
          this.router.navigate(['add-horarios/' + materia.id]);
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

  async abrirAlertarDeletar(materia: Materia) {
    const alert = await this.alertController.create({
      header: 'Deletar matéria?',
      message: 'Essa ação não poderá ser desfeita!',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: async () => {
            this.apagarHorariosDaMateria(materia);
            await this.apagarMateria(materia);
            this.toastService.sucesso('Matéria e horários excluidos com sucesso!');
          }
        }
      ]
    });

    await alert.present();
  }

  async apagarHorariosDaMateria(materia: Materia) {
    this.horarioService.getHorarios().then(
      async horarios => await this.storageService.salvarListaHorarios(horarios.filter(h => h.materia_nome != materia.nome)));
  }

  apagarMateria(materia: Materia) {
    this.storageService.getMaterias().then(
      async materias => {
        await this.storageService.salvarListaMaterias(materias.filter(m => m.nome != materia.nome));
        this.storageService.getMaterias().then(materias_salvas => {
          this.materias = materias_salvas
        });
      });
  }

}
