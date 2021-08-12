import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Horario } from 'src/app/models/horario.model';
import { Materia } from 'src/app/models/materia.model';
import { HorarioService } from 'src/app/services/horario.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-horarios',
  templateUrl: './add-horarios.page.html',
  styleUrls: ['./add-horarios.page.scss'],
})
export class AddHorariosPage implements OnInit {

  dias_da_semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
  materia: Materia;
  formulario: any;
  horarios = [];

  constructor(private router: Router,
    private fb: FormBuilder,
    private routeActivated: ActivatedRoute,
    private toastService: ToastService,
    private horarioService: HorarioService,
    private storageService: StorageService) { }

  ionViewWillEnter() {
    this.routeActivated.params.subscribe(x => {
      this.storageService.getMateriaPorId(x.materia_id).then(xd => {
        this.materia = xd;
        this.horarioService.getHorariosPorMateria(this.materia.nome).then(horarios_da_materia => {
          this.horarios = horarios_da_materia || [];
        });
      })
    });
  }

  ngOnInit() {
    this.formulario = this.fb.group({
      dia: ['', Validators.required],
      inicio: ['2021-08-10T12:00:44.135-03:00', Validators.required],
      termino: ['2021-08-10T12:00:44.135-03:00', Validators.required]
    });
  }

  adicionarNaLista() {
    let horario = this.formulario.value as Horario;
    horario.materia_nome = this.materia.nome;
    this.horarios.push(horario);
  }

  get formularioValido(): boolean {
    return this.formulario.valid;
  }

  removerDaLista(horario: any) {
    const index = this.horarios.indexOf(horario);
    if (index > -1) {
      this.horarios.splice(index, 1);
    }
  }

  async salvarNovosHorarios() {
    this.horarioService.salvarHorariosDaMateria(this.horarios);
    this.toastService.sucesso('Horários configurados!')
    this.router.navigate(['materias']);
  }

}
