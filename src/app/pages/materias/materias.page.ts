import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  materias = [
    {nome: "PROGRAMAÇÃO FUNCIONAL", horas: 60},
    {nome: "SEMINÁRIOS EM COMPUTAÇÃO", horas: 30},
    {nome: "VETORES E GEOMETRIA ANALÍTICA", horas: 60},
    {nome: "PRÁTICA EM SISTEMAS DIGITAIS", horas: 30},
    {nome: "FUNDAMENTOS DE SISTEMAS EMBARCADOS", horas: 30},
    {nome: "INFORMÁTICA, ÉTICA E SOCIEDADE", horas: 60},
    {nome: "CÁLCULO C", horas: 60},
];

  constructor() { }

  ngOnInit() {
  }

}
