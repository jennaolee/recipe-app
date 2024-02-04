import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: '', component: RecipeFormComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
