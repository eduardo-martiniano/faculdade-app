import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Tarefa } from 'src/app/models/tarefa.model';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tarefa-detalhes',
  templateUrl: './tarefa-detalhes.page.html',
  styleUrls: ['./tarefa-detalhes.page.scss'],
})
export class TarefaDetalhesPage implements OnInit {

  @Input() tarefa: Tarefa;

  constructor(private modalController: ModalController,
              private toastService: ToastService,
              private storageService: StorageService) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  excluir() {
    this.storageService.getTarefas().then(async tarefas =>
      {
        await this.storageService.salvarListaTarefas(tarefas.filter(t => t.id != this.tarefa.id));
        this.storageService.tarefas.next(true);
        this.toastService.sucesso('Tarefa excluida com sucesso!');
        this.modalController.dismiss();
      });
  }

}
