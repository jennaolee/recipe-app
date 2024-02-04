import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent {
  displayStyle = "none";
  form: FormGroup;

  @Output() add = new EventEmitter();

  constructor(private recipeService: RecipeService, private router: Router) { 

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

  onSubmit(values:any){
    this.recipeService.add(values);
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
