import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Horario } from '../models/horario.model';
import { Materia } from '../models/materia.model';
import { Tarefa } from '../models/tarefa.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService{

  numero_tarefas_pendentes = 0;
  private _storage: Storage | null = null;
  public materias: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public tarefas: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.getMaterias().then(async x => {
      if(x == null) {
        await this._storage?.set('materias', []);
      }
    });

    this.getHorarios().then(async x => {
      if(x == null) {
        await this._storage?.set('horarios', []);
      }
    });

    this.getTarefas().then(async x => {
      if(x == null) {
        await this._storage?.set('tarefas', []);
      }
      this.getTarefas().then(_tarefas => {
        this.numero_tarefas_pendentes = _tarefas.filter(t => t.concluido == false).length;
      })
    });
  }

  getMaterias(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage?.get('materias').then(
      result => resolve(result),
      error => reject(error));
    });
  }

  getTarefas(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage?.get('tarefas').then(
      result => resolve(result),
      error => reject(error));
    });
  }

  getMateriaPorId(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage?.get('materias').then(
      result => resolve(result.filter(m => m.id == id)[0]),
      error => reject(error));
    });
  }

  salvarMateria(materia: Materia) {
    let materias = [];
    this.getMaterias().then(async materias_salvas => {
      materias = materias_salvas;
      materias.push(materia);
      await this._storage?.set('materias', materias);
      this.materias.next(true);
    });
  }

  getHorarios(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage?.get('horarios').then(
      result => resolve(result),
      error => reject(error));
    });
  }

  async salvarListaHorarios(horarios: Horario[]) {
    await this._storage?.set('horarios', horarios);
  }

  async salvarListaMaterias(materias: Materia[]) {
    await this._storage?.set('materias', materias);
  }

  async salvarListaTarefas(tarefas: Tarefa[]) {
    this.numero_tarefas_pendentes = tarefas.filter(t => t.concluido == false).length;
    await this._storage?.set('tarefas', tarefas);
  }

}
