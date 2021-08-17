import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tarefa } from 'src/app/models/tarefa.model';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-tarefa',
  templateUrl: './add-tarefa.page.html',
  styleUrls: ['./add-tarefa.page.scss'],
})
export class AddTarefaPage implements OnInit {

  materias = [];
  formulario: any;

  constructor(private storageService: StorageService,
              private toastService: ToastService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.iniciarFormulario();
  }
  
  ionViewWillEnter() {
    this.storageService.getMaterias().then(materias =>
      {
        this.materias = materias
      });
  }

  salvar() {
    let tarefa = this.formulario.value as Tarefa;
    const ano = new Date().getFullYear();
    const mes = this.formulario.value.data_limite.substring(5,7);
    const dia = this.formulario.value.data_limite.substring(8,10);
    const hora = this.formulario.value.hora.substring(11,13);
    const minuto = this.formulario.value.hora.substring(14,16);
    tarefa.prazo = new Date(`${ano}/${mes}/${dia} ${hora}:${minuto}`);

    let _tarefas = [];
    this.storageService.getTarefas().then(tarefas =>
      {
        _tarefas = tarefas;
        _tarefas.push(tarefa);
        this.storageService.salvarListaTarefas(_tarefas);
        this.formulario.reset();
        this.iniciarFormulario();
        this.toastService.sucesso('Tarefa criada com sucesso!');
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

}
