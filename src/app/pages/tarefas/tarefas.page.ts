import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa.model';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  tarefas: Tarefa[] = [
    { id: 1, descricao: "Lista de exercicios", prioridade: 2, materia_nome: "Calculo 1", status: "atrasado"},
    { id: 1, descricao: "Pesquisar sobre responsividade ", prioridade: 0, materia_nome: "Programação web", status: "concluido"},
    { id: 1, descricao: "Resolver lista fudida", prioridade: 2, materia_nome: "Geometria analitica e Vetorial", status: "pendente"},
    { id: 1, descricao: "Seminario", prioridade: 1, materia_nome: "Calculo 1", status: "proximo"}
  ];

  constructor() { }

  ngOnInit() {
  }

  reorderItems(ev) {
    const itemMove = this.tarefas.splice(ev.detail.from, 1)[0];
    this.tarefas.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
    console.log(this.tarefas);
  }

}
