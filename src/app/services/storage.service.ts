import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
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
    this.obterMaterias().then(async x => {
      if(x == null) {
        await this._storage?.set('materias', []);
      }
    })
  }

  obterMaterias(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._storage?.get('materias').then(
      result => resolve(result),
      error => reject(error));
    });
  }

  salvarMateria(materia: Materia) {
    let materias = [];
    this.obterMaterias().then(async materias_salvas => {
      materias = materias_salvas;
      materias.push(materia);
      await this._storage?.set('materias', materias);
      this.materias.next(true);
    });
  }

}
