import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-horarios',
  templateUrl: './add-horarios.page.html',
  styleUrls: ['./add-horarios.page.scss'],
})
export class AddHorariosPage implements OnInit {

  dias_da_semana = ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA'];

  constructor() { }

  ngOnInit() {
  }

}
