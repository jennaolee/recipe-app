import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  ingredients: any = [];
  recipes: any = [];
  recipe: any;

  private apiUrl = 'http://localhost:4000';

  ngOnInit(): void {
    this.recipes = [];
  }

  constructor(private router: Router, private http: HttpClient, private zone: NgZone) { 
    this.recipes = [];
    // const res = this.http.get<any[]>(this.apiUrl);

    // const result = res.subscribe( 
    //   data => {
    //     // console.log(data[0])
    //     // console.log(data.length)

    //     for (let i = 0; i < data.length; i++) {
    //       this.recipes.push(data[i])
    //     }
    //   })
    // var keys = Object.keys(localStorage)

    // for (let i = 0; i < keys.length; i++) {
    //   // console.log(keys[i]);
    //   this.recipes.push(localStorage.getItem(keys[i]));
    //   let item = localStorage.getItem(keys[i]);
    //   // console.log(item!);
    // }
  }
  async get(): Promise<any[]> {
    this.recipes = [];
    
    try {
      const data = await this.http.get<any[]>(this.apiUrl).toPromise();
      
      console.log(data);
      // console.log(data.length);
  
      this.zone.run(() => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            // console.log(data![i]);
            this.recipes.push(data[i]);
          }
        }
      });
  
      console.log(this.recipes.length);
  
      return this.recipes;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error or throw it again if needed
      throw error;
    }
  }

  // get() {
  //   this.recipes = []
  //   const res = this.http.get<any[]>(this.apiUrl);

  //   const result = res.subscribe( 
  //     data => {
  //       console.log(data);
  //       console.log(data.length);
  //       this.zone.run(() => {
  //         for (let i = 0; i < data.length; i++) {
  //           console.log(data[i]);
  //           this.recipes.push(data[i])

  //         }
  //       })
  //       // console.log(data[0])
  //       // console.log(data.length)
  //     })
  //   // var keys = Object.keys(localStorage)

  //   // for (let i = 0; i < keys.length; i++) {
  //   //   console.log(keys[i]);
  //   //   this.recipes.push(localStorage.getItem(keys[i]));
  //   //   console.log(this.recipes);
  //   // }

  //   console.log(this.recipes.length)
  //   return this.recipes
  // }

  // getIngredients(id: number) {
  //   this.ingredients = [];
  //   const res = this.http.get<any[]>(this.apiUrl + '/recipes/' + id);

  //   const result = res.subscribe( 
  //     data => {
  //       // console.log(data[0])
  //       // console.log(data.length)

  //       for (let i = 0; i < data.length; i++) {
  //         this.ingredients.push(data[i])
  //       }
  //     })
  //     console.log(this.ingredients)
  //     return this.ingredients

  // }

  async getIngredients(id: number): Promise<any[]> {
    this.ingredients = [];
    try {

    
      const data = await this.http.get<any[]>(this.apiUrl + '/recipes/' + id).toPromise();

      console.log(data);
      this.zone.run(() => {
        if (data) {
          for (let i = 0; i < data.length; i++) {
            this.ingredients.push(data[i])
          }
        }
      })

      console.log(this.ingredients)
      return this.ingredients

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error or throw it again if needed
      throw error;
    }
    // const result = data.subscribe( 
    //   data => {
    //     // console.log(data[0])
    //     // console.log(data.length)

    //     for (let i = 0; i < data.length; i++) {
    //       this.ingredients.push(data[i])
    //     }
    //   })
     

  }

  

  async add(recipe: any): Promise<any> {
    console.log(recipe)
    let date = (new Date()).getTime();
    let newRecipe: Recipe = new Recipe(0, recipe.name, recipe.ingredients, recipe.directions, date);
    console.log(newRecipe);

    try {
      let res = await this.http.post<any[]>(this.apiUrl, newRecipe).toPromise();
      location.reload();
      return res;
      // console.log(data)

    } catch (error) {
      console.error('Error adding data:', error);
      // Handle the error or throw it again if needed
      throw error;

    }
    // localStorage.setItem(recipe.name, JSON.stringify(newRecipe));
    // console.log(recipe);
    // location.reload();
  }

  async delete(id: number): Promise<any[]>{
    console.log(this.recipes)
    console.log(id)

    this.recipes = this.recipes.filter((r: { id: number })=>r.id != id);
    try {
      let res = await this.http.delete<any[]>(this.apiUrl + '/recipes/' + id).toPromise();
      // console.log("RES:" + res)
      location.reload();
  
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle the error or throw it again if needed
      throw error;
    }
    // localStorage.removeItem(name);
    // location.reload();
    
    console.log(this.recipes)
    return this.recipes;
  }

  async update(recipe: any, id: number): Promise<any> {
    console.log(recipe)
    console.log(id)

    let date = (new Date()).getTime();
    let newRecipe: Recipe = new Recipe(id, recipe.name, recipe.ingredients, recipe.directions, date);
    console.log(newRecipe);

    try {
      let res = await this.http.put<any[]>(this.apiUrl + '/recipes/' + id, newRecipe).toPromise();
      // console.log("RES:" + res)
      location.reload();
      return res;
  
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle the error or throw it again if needed
      throw error;
    }
  }
}