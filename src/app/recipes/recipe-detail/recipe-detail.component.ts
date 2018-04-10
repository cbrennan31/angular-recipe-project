import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  recipe: Recipe

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router,
              ) {}

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipesService.getRecipe(+params.id)
    })
  }

  onAddToList() {
    this.recipesService.addIngredientsToList(this.recipe.ingredients)
    this.router.navigate(['shopping-list'])
  }
}
