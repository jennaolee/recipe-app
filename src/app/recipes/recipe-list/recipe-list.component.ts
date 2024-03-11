import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../recipe.model';
import { RecipeInfoComponent } from '../recipe-info/recipe-info.component';
import { RecipeUpdateFormComponent } from "../recipe-update-form/recipe-update-form.component";

@Component({
    selector: 'app-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.css',
    imports: [RecipeInfoComponent, CommonModule, RecipeUpdateFormComponent]
})
export class RecipeListComponent implements OnInit {
  ingredients: any[];
  storedRecipes: any[];
  recipes: Recipe[];

  @Output() add = new EventEmitter();

  async ngOnInit() {
    // Use an asynchronous function to load data
    try {
      this.storedRecipes = await this.recipeService.get();

      for (let i = 0; i < this.storedRecipes.length; i++) {
        let id = this.storedRecipes[i]["recipe_id"]
        let name = this.storedRecipes[i]["name"]
        let directions = this.storedRecipes[i]["directions"]
        let date = this.storedRecipes[i]["date"]
        let ingredients = await this.recipeService.getIngredients(id)
        let ingredientsString: string = "";

        for (let j = 0; j < ingredients.length; j++) {
          ingredientsString += (ingredients[j]["name"] + '\n')

        }

        console.log("console: "+ ingredientsString)
        let newRecipe = new Recipe(id, name, ingredientsString, directions, date);

        this.recipes.push(newRecipe);
      }

      // console.log('Stored Recipes:', this.storedRecipes);
      // console.log('Recipes:', this.recipes);

      // for (let i = 0; i < this.storedRecipes.length; i++) {
    //   let existingRecipes = JSON.parse(this.storedRecipes[i])
    //   let id = existingRecipes["recipe_id"];
    //   let name = existingRecipes["title"];
    //   let ingredients = this.recipeService.getIngredients(id);
    //   let directions = existingRecipes["instructions"];
    //   let date = existingRecipes["datemodified"];
    //   console.log(JSON.parse(this.storedRecipes[i]));
    //   let newRecipe = new Recipe(id, name, ingredients, directions, date);

    //   this.recipes.push(newRecipe);
    // }

    // console.log(this.recipes)

    // sort by modification date
    this.recipes.sort(function(a,b) {
      return String(a.date).localeCompare(String(b.date));
    })

    } catch (error) {
      console.error('Error:', error);
    }
  }

  constructor(private recipeService: RecipeService) {
    this.ingredients = [];
    this.storedRecipes = [];
    this.recipes = [];
    // this.storedRecipes = this.recipeService.get();
    // console.log("HERE" + this.storedRecipes);

    

    // for (let i = 0; i < this.storedRecipes.length; i++) {
    //   let existingRecipes = JSON.parse(this.storedRecipes[i])
    //   let id = existingRecipes["recipe_id"];
    //   let name = existingRecipes["title"];
    //   let ingredients = this.recipeService.getIngredients(id);
    //   let directions = existingRecipes["instructions"];
    //   let date = existingRecipes["datemodified"];
    //   console.log(JSON.parse(this.storedRecipes[i]));
    //   let newRecipe = new Recipe(id, name, ingredients, directions, date);

    //   this.recipes.push(newRecipe);
    // }

    // console.log(this.recipes)

    // sort by modification date
    this.recipes.sort(function(a,b) {
      return String(a.date).localeCompare(String(b.date));
    })
  }
}


