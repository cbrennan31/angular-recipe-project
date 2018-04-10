import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model'
import { RecipesService } from '../recipes.service'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]

  constructor(private route: ActivatedRoute,
              private recipesService: RecipesService) {

  }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes()

    this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    )
  }
}
