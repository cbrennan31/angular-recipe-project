import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service'
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private FormBuilder: FormBuilder
              ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editMode = !!params.id
      if (this.editMode) {
        this.recipe = this.recipesService.getRecipe(+params.id)
      }
    })

    this.recipeForm = new FormGroup({
      'name': new FormControl(null),
      'description': new FormControl(null),
      'imagePath': new FormControl(null)
      'ingredients': new FormArray([])
    })
  }

  onAddIngredient() {
    const ingredientControls = new FormGroup({
      'name': new FormControl(null),
      'amount': new FormControl(null)
    })
    this.recipeForm.get('ingredients').push(ingredientControls)
  }

  onSubmit() {
    let name = this.recipeForm.value.name
    let description = this.recipeForm.value.description
    let imagePath = this.recipeForm.value.imagePath
    let ingredients: Ingredient[] = this.recipeForm.value.ingredients.map((ing) => {
      return new Ingredient(ing.name, ing.amount)
    })

    let recipe = new Recipe(
      Math.floor(Math.random() * 10000000),
      name,
      description,
      imagePath
      ingredients
    )

    this.recipesService.addRecipe(recipe)
    this.recipeForm.reset()
  }
}
