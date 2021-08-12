import { Injectable } from '@angular/core';
import { Horario } from '../models/horario.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private context: StorageService) { }

  getHorarios(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.context.getHorarios().then(
      result => resolve(result),
      error => reject(error));
    });
  }

  getHorariosPorMateria(materia_nome: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.context.getHorarios().then(
      result => resolve(result.filter(m => m.materia_nome == materia_nome)),
      error => reject(error));
    });
  }

  salvarHorariosDaMateria(horarios_lista: Horario[]) {
    let horarios = [];
    this.context.getHorarios().then(horarios_salvos => {
      horarios = horarios_salvos.filter(h => h.materia_nome != horarios_lista[0].materia_nome);
      horarios_lista.map(h => horarios.push(h));
      this.context.salvarListaHorarios(horarios);
    });
  }

}
