import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { RecipeInfoComponent } from './recipes/recipe-info/recipe-info.component';
import { RecipeUpdateFormComponent } from './recipes/recipe-update-form/recipe-update-form.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: '', component: RecipeFormComponent },
  { path: 'recipes:id', component: RecipeInfoComponent },
  { path: 'recipes:id', component: RecipeUpdateFormComponent },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
