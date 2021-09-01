import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefa } from 'src/app/models/tarefa.model';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.page.html',
  styleUrls: ['./editar-tarefa.page.scss'],
})
export class EditarTarefaPage implements OnInit {

  materias = [];
  formulario: any;

  constructor(private storageService: StorageService,
              private routeActivated: ActivatedRoute,
              private router: Router,
              private _location: Location,
              private toastService: ToastService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  ionViewWillEnter() {
    this.storageService.getMaterias().then(materias => {
      this.materias = materias
      this.routeActivated.params.subscribe(x => {
        this.storageService.getTarefas().then(tarefas => {
          let tarefa = tarefas.filter(t => t.id == x.id)[0];
          this.formulario = this.fb.group({
            id: [tarefa.id],
            descricao: [tarefa.descricao, Validators.required],
            materia_nome: [tarefa.materia_nome, Validators.required],
            data_criacao: [tarefa.data_criacao],
            data_limite: [tarefa.data_limite, Validators.required],
            hora: [tarefa.hora, Validators.required],
            status: ['pendente'],
            concluido: [false]
          });
        })
      })
    });
  }

  salvar() {
    let tarefa = this.formulario.value as Tarefa;
    const ano = new Date().getFullYear();
    const mes = this.formulario.value.data_limite.substring(5, 7);
    const dia = this.formulario.value.data_limite.substring(8, 10);
    const hora = this.formulario.value.hora.substring(11, 13);
    const minuto = this.formulario.value.hora.substring(14, 16);
    tarefa.prazo = new Date(`${ano}/${mes}/${dia} ${hora}:${minuto}`);

    let _tarefas = [];
    this.storageService.getTarefas().then(tarefas => {
      _tarefas = tarefas.filter(t => t.id != tarefa.id);
      _tarefas.push(tarefa);
      this.storageService.salvarListaTarefas(_tarefas);
      this.formulario.reset();
      this.iniciarFormulario();
      this.toastService.sucesso('Tarefa editada com sucesso!');
      this.router.navigate(['tarefas']);
    });
  }

  get formularioValido(): boolean {
    return this.formulario.valid;
  }

  iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [new Date().getTime()],
      descricao: ['', Validators.required],
      materia_nome: ['', Validators.required],
      data_criacao: [new Date()],
      data_limite: ['', Validators.required],
      hora: ['', Validators.required],
      status: ['pendente'],
      concluido: [false]
    });
  }

  voltar() {
    this._location.back();
  }

}
