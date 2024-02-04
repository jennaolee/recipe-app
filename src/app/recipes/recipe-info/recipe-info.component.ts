import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';

@Pipe({  name: 'dateCount'}) 
export class DateCountPipe implements PipeTransform {  
  transform(value: any): number {    
    let today:Date = new Date(); 
    //get current date and time    
    let todayWithNoTime:any = new Date(today.getFullYear(), today.getMonth(), today.getDate())    
    var dateDifference = Math.abs(value - todayWithNoTime);
    //returns value in miliseconds    
    const secondsInDay = 86400; //60 seconds * 60 minutes in an hour * 24 hours in a day    
    var dateDifferenceSeconds = dateDifference*0.001; 
    //converts miliseconds to seconds    
    var dateCounter = dateDifferenceSeconds/secondsInDay;    
    if (dateCounter >= 1 && value > todayWithNoTime){      
      return dateCounter;    
    }else{ 
      return 0;    
    }  
  }
}

@Component({
  selector: 'app-recipe-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-info.component.html',
  styleUrl: './recipe-info.component.css'
})
export class RecipeInfoComponent {
  displayStyle = "none";
  recipeIngredients: string[] = [];
  recipeDirections: string[] = [];
  recipeName: string = "";

  @Input() recipe: any;
  @Output() open = new EventEmitter()

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  openPopup(evt:any, recipe: Recipe) {

    this.displayStyle = "block";
    this.recipeName = recipe.name[0].toUpperCase() + recipe.name.substring(1).toLowerCase();

    this.recipeIngredients = String(this.recipe.ingredients).split("\n");
    this.recipeIngredients = this.recipeIngredients.filter(Boolean);

    console.log(this.recipeIngredients);
    for (let i = 0; i < this.recipeIngredients.length; i++) {
      this.recipeIngredients[i] = this.recipeIngredients[i][0].toUpperCase() + this.recipeIngredients[i].substring(1).toLowerCase();
    }
    this.recipeDirections = String(this.recipe.directions).split("\n");
    this.recipeDirections = this.recipeDirections.filter(Boolean);
    for (let i = 0; i < this.recipeDirections.length; i++) {
      if (this.recipeDirections[i] == "") {
        this.recipeDirections.pop();

      } else {
        this.recipeDirections[i] = this.recipeDirections[i][0].toUpperCase() + this.recipeDirections[i].substring(1).toLowerCase();
      }
    }

    evt["name"] = recipe.name;
    evt["ingredients"] = recipe.ingredients;
    evt["directions"] = recipe.directions;
    evt["date"] = recipe.date;
    this.open.emit(evt)
  }

  closePopup() {
    this.displayStyle = "none";
  }

  deleteRecipe(name: string) {
    this.recipeService.delete(name);
  }
}
