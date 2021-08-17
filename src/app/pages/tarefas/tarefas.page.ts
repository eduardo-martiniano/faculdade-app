import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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

  constructor(private storageService: StorageService,
              private modalController: ModalController) { }

  ionViewWillEnter() {
    this.storageService.tarefas.subscribe(valor =>
      {
        this.storageService.getTarefas().then(_tarefas =>
        {
          this.tarefas = _tarefas;
          this.tarefas.map(t => t.status = this.definirStatus(t.concluido, t.prazo));
        });
      }
    );
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
    this.tarefas.filter(t => t.id == tarefa.id).map(tr =>
      {
        tr.concluido = !tr.concluido;
        tr.status = this.definirStatus(tr.concluido, tr.prazo);
      });
    this.storageService.salvarListaTarefas(this.tarefas);
  }

  async verDetalhes(tarefa: Tarefa) {
    const modal = await this.modalController.create({
      component: TarefaDetalhesPage,
      cssClass: 'my-custom-class',
      componentProps: {tarefa}
    });
    return await modal.present();

  }

}
