import { UpdateComponent } from './update/update.component';
import { FormComponent } from './form/form.component';

import { DisplayformComponent } from './displayform/displayform.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'displayform', component: DisplayformComponent 
  },
  {
    path: 'form', component: FormComponent
  },
  {
    path: 'update/:id', component: UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DisplayformComponent, FormComponent, UpdateComponent]
