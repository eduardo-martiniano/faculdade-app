import { Component, OnInit } from '@angular/core';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { Tarefa } from 'src/app/models/tarefa.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  tarefas: Tarefa[] = [
    // { id: 1, descricao: "Lista de exercicios", prioridade: 2, materia_nome: "Calculo 1", status: "atrasado"},
    // { id: 1, descricao: "Pesquisar sobre responsividade ", prioridade: 0, materia_nome: "Programação web", status: "concluido"},
    // { id: 1, descricao: "Resolver lista fudida", prioridade: 2, materia_nome: "Geometria analitica e Vetorial", status: "pendente"},
    // { id: 1, descricao: "Seminario", prioridade: 1, materia_nome: "Calculo 1", status: "proximo"}
  ];

  constructor(private storageService: StorageService) { }

  ionViewWillEnter() {
    this.storageService.getTarefas().then(_tarefas =>
      {
        this.tarefas = _tarefas
        this.tarefas.map(t => t.status = this.definirStatus(t.concluida, t.prazo));
        console.log(this.tarefas);
      });
  }

  ngOnInit() {
  }

  reorderItems(ev) {
    const itemMove = this.tarefas.splice(ev.detail.from, 1)[0];
    this.tarefas.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
    console.log(this.tarefas);
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
    console.log(diferencaDias);
    return diferencaDias;
  }

}
