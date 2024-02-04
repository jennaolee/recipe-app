import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeInfoComponent } from "./recipes/recipe-info/recipe-info.component";
import { RecipeFormComponent } from "./recipes/recipe-form/recipe-form.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, RecipesComponent, RecipeListComponent, RecipeInfoComponent, RecipeFormComponent]
})
export class AppComponent {
  title = 'recipe-app';
}
