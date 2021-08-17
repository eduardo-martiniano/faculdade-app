import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'materias',
    loadChildren: () => import('./pages/materias/materias.module').then( m => m.MateriasPageModule)
  },
  {
    path: 'add-materia',
    loadChildren: () => import('./pages/add-materia/add-materia.module').then( m => m.AddMateriaPageModule)
  },
  {
    path: 'add-horarios/:materia_id',
    loadChildren: () => import('./pages/add-horarios/add-horarios.module').then( m => m.AddHorariosPageModule)
  },
  {
    path: 'horarios',
    loadChildren: () => import('./pages/horarios/horarios.module').then( m => m.HorariosPageModule)
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./pages/tarefas/tarefas.module').then( m => m.TarefasPageModule)
  },
  {
    path: 'add-tarefa',
    loadChildren: () => import('./pages/add-tarefa/add-tarefa.module').then( m => m.AddTarefaPageModule)
  },
  {
    path: 'tarefa-detalhes',
    loadChildren: () => import('./pages/tarefa-detalhes/tarefa-detalhes.module').then( m => m.TarefaDetalhesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
