import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HorarioService } from 'src/app/services/horario.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  @ViewChild('slides', {static: true}) slides: IonSlides;
  data = new Date();

  semana = [
    {
      dia: "Domingo",
      horarios: [],
    },
    {
      dia: "Segunda-feira",
      horarios: [],
    },
    {
      dia: "Terça-feira",
      horarios: [],
    },
    {
      dia: "Quarta-feira",
      horarios: [],
    },
    {
      dia: "Quinta-feira",
      horarios: [],
    },
    {
      dia: "Sexta-feira",
      horarios: [],
    },
    {
      dia: "Sábado",
      horarios: [],
    },
  ]

  constructor(private horarioService: HorarioService) {}

  ionViewWillEnter() {
    this.montarSlides();
    this.slides.slideTo(new Date().getDay());
  }

  ngOnInit() {}

  montarSlides() {
    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira",
                    "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    this.horarioService.getHorarios().then(horarios_salvos => {
      for (let i = 0; i < semana.length; i++) {
        this.semana[i].horarios = (horarios_salvos.filter(h => h.dia == semana[i])).sort((i, t) => {
          return i.inicio < t.inicio ? -1 : i.inicio > t.inicio ? 1 : 0;
        })
      };
    });
  }

}
