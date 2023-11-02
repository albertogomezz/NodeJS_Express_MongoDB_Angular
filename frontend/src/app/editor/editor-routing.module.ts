import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { EditableProductResolver } from './editable-product-resolver.service';
import { AuthGuard } from '../core';
import { SharedModule } from '../shared';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      product: EditableProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {}