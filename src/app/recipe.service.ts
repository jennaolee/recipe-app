import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  recipes: any = [];
  recipe: any;

  ngOnInit(): void {
    this.recipes = [];
  }

  constructor(private router: Router) { 
    this.recipes = [];
    var keys = Object.keys(localStorage)

    for (let i = 0; i < keys.length; i++) {
      console.log(keys[i]);
      this.recipes.push(localStorage.getItem(keys[i]));
      let item = localStorage.getItem(keys[i]);
      console.log(item!);
    }
  }

  get() {
    this.recipes = []
    var keys = Object.keys(localStorage)

    for (let i = 0; i < keys.length; i++) {
      console.log(keys[i]);
      this.recipes.push(localStorage.getItem(keys[i]));
      console.log(this.recipes);
    }

    return this.recipes
  }

  add(recipe: any){
    let date = (new Date()).getTime();
    let newRecipe: Recipe = new Recipe(recipe.name, recipe.ingredients, recipe.directions, date);
    localStorage.setItem(recipe.name, JSON.stringify(newRecipe));
    console.log(recipe);
    location.reload();
  }

  delete(name: string){
    this.recipes = this.recipes.filter((r: { name: string })=>r.name != name);
    localStorage.removeItem(name);
    location.reload();
    
    return this.recipes;
  }
}