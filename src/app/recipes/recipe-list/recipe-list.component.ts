import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../recipe.model';
import { RecipeInfoComponent } from '../recipe-info/recipe-info.component';

@Component({
    selector: 'app-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    imports: [RecipeInfoComponent, CommonModule]
})
export class RecipeListComponent {
  storedRecipes: any[];
  recipes: Recipe[];

  @Output() add = new EventEmitter();

  constructor(private recipeService: RecipeService) {
    this.recipes = [];
    this.storedRecipes = this.recipeService.get();
    console.log(this.storedRecipes.length);

    for (let i = 0; i < this.storedRecipes.length; i++) {
      let existingRecipes = JSON.parse(this.storedRecipes[i])
      let name = existingRecipes["name"];
      let ingredients = existingRecipes["ingredients"];
      let directions = existingRecipes["directions"];
      let date = existingRecipes["date"];
      console.log(JSON.parse(this.storedRecipes[i]));
      let newRecipe = new Recipe(name, ingredients, directions, date);

      this.recipes.push(newRecipe);
    }

    // sort by modification date
    this.recipes.sort(function(a,b) {
      return String(a.date).localeCompare(String(b.date));
    })
  }
}


