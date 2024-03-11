import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-update-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-update-form.component.html',
  styleUrl: './recipe-update-form.component.css'
})
export class RecipeUpdateFormComponent {
  displayStyle = "none";
  form: FormGroup;

  @Input() recipe: any;
  @Output() add = new EventEmitter();

  constructor(private recipeService: RecipeService) { 

    let formControls = {
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(1)
      ]),

      ingredients: new FormControl('',[
        Validators.required,
        Validators.minLength(1)
      ]),

      directions: new FormControl('',[
        Validators.required,
        Validators.minLength(1)
      ]),
    }

    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {}

  openPopup(evt:any, recipe: Recipe) {
    this.togglePopUp();
  }

  onSubmit(values:any){
    this.recipeService.update(values, this.recipe.id);
      const formToReset = document.getElementById('recipe_form')!;
      formToReset.addEventListener('submit', (e) => {
         e.preventDefault();
         (<HTMLFormElement>formToReset).reset();
      });
    console.log(values);
  }

  togglePopUp() {
    this.resetForm();
    if (this.displayStyle == "block") {
      this.displayStyle = "none";
    } else {
      this.displayStyle = "block";
    }
  }

  closePopUp() {
    this.displayStyle = "none";
    this.resetForm();
  }

  resetForm() {
    const formToReset = document.getElementById('recipe_form')!;
    (<HTMLFormElement>formToReset).reset();
  }
}
