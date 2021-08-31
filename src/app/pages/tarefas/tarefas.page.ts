import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Tarefa } from 'src/app/models/tarefa.model';
import { StorageService } from 'src/app/services/storage.service';
import { TarefaDetalhesPage } from '../tarefa-detalhes/tarefa-detalhes.page';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  tarefas: Tarefa[] = [];
  tarefas_pendentes = 0;
  materias = [];

  constructor(private storageService: StorageService,
    private router: Router,
    private alertController: AlertController,
    private modalController: ModalController) { }

  ionViewWillEnter() {
    this.storageService.tarefas.subscribe(valor => {
      this.storageService.getTarefas().then(_tarefas => {
        this.tarefas = _tarefas;
        this.tarefas.map(t => t.status = this.definirStatus(t.concluido, t.prazo));
      });
    });

    this.storageService.getMaterias().then(_materias => this.materias = _materias);
  }

  ngOnInit() {
  }

  reorderItems(ev) {
    const itemMove = this.tarefas.splice(ev.detail.from, 1)[0];
    this.tarefas.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
    this.storageService.salvarListaTarefas(this.tarefas);
  }

  definirStatus(concluido: boolean, prazo: Date): string {
    if (concluido) return 'concluido';

    if (this.calcularTempoEmDias(prazo) < 0) return 'atrasado';

    if (this.calcularTempoEmDias(prazo) < 1.5) return 'proximo';

    if (this.calcularTempoEmDias(prazo) > 1) return 'pendente';

    return 'pendente';
  }

  calcularTempoEmDias(prazo: Date): number {
    var diferenca = prazo.getTime() - new Date().getTime();
    var diferencaDias = (diferenca / 86400000);
    return diferencaDias;
  }

  concluirTarefa(tarefa: Tarefa) {
    this.tarefas.filter(t => t.id == tarefa.id).map(tr => {
      tr.concluido = !tr.concluido;
      tr.status = this.definirStatus(tr.concluido, tr.prazo);
    });
    this.storageService.salvarListaTarefas(this.tarefas);
  }

  async addTarefa() {
    if (this.materias.length > 0) {
      this.router.navigate(['add-tarefa']);
    }
    else {
      const alert = await this.alertController.create({
        header: 'Você ainda não possui matérias!',
        message: 'Cadastre ao menos uma matéria para vincular tarefas a ela.',
        buttons: [
          {
            text: 'Cancelar'
          },
          {
            text: 'Confirmar',
            handler: async () => {
              this.router.navigate(['add-materia']);
            }
          }
        ]
      });
      await alert.present();
    }

  }

  async verDetalhes(tarefa: Tarefa) {
    const modal = await this.modalController.create({
      component: TarefaDetalhesPage,
      cssClass: 'my-custom-class',
      componentProps: { tarefa }
    });
    return await modal.present();

  }

}
