import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tarefas: Tarefa[] = [];
  numero_tarefas = 0;
  numero_tarefas_pendentes = 0;
  numero_tarefas_proxima = 0;
  numero_tarefas_atrasadas = 0;
  numero_tarefas_concluidas = 0;

  constructor(private storageService: StorageService) { }

  ionViewWillEnter() {
    this.storageService.getTarefas().then(_tarefas =>
      {
        this.tarefas = _tarefas;
        this.tarefas.map(t => t.status = this.definirStatus(t.concluido, t.prazo));
        this.numero_tarefas = this.tarefas.length;
        this.numero_tarefas_pendentes = this.tarefas.filter(t => t.status == 'pendente').length;
        this.numero_tarefas_proxima = this.tarefas.filter(t => t.status == 'proximo').length;
        this.numero_tarefas_atrasadas = this.tarefas.filter(t => t.status == 'atrasado').length;
        this.numero_tarefas_concluidas = this.tarefas.filter(t => t.status == 'concluido').length;
      });
  }

  ngOnInit() {
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

}
