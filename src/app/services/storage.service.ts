import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { Horario } from '../models/horario.model';
import { Materia } from '../models/materia.model';


@Injectable({
  providedIn: 'root'
})
export class StorageService{

  private _storage: Storage | null = null;
  public materias: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
  }

  getMaterias(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage?.get('materias').then(
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

}
