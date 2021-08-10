import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Materia } from 'src/app/models/materia.model';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.page.html',
  styleUrls: ['./add-materia.page.scss'],
})
export class AddMateriaPage implements OnInit {

  formulario: any;

  constructor(private fb: FormBuilder,
    private toastService: ToastService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      horas: ['', Validators.required],
    });
  }

  salvar() {
    let materia = this.formulario.value as Materia;
    materia.id = new Date().getTime();
    this.storageService.salvarMateria(materia);
    this.toastService.sucesso('Materia salva com sucesso!');
    this.formulario.reset();
  }

  get formularioValido(): boolean {
    return this.formulario.valid;
  }

}
