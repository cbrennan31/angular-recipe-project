import { Injectable, EventEmitter} from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Recipe } from  './recipe.model'
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list/shopping-list.service'

@Injectable()

export class RecipesService {
  recipesChanged = new EventEmitter<Recipe[]>()

  private recipes: Recipe[] = [
    new Recipe(1,
      'Schnitzel',
      'So German',
      'http://images.clipartpanda.com/recipe-clipart-recipe-clipart-1.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(2,
      'Burger',
      'So healthy',
      'http://images.clipartpanda.com/recipe-clipart-recipe-clipart-1.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService,
              private httpClient: HttpClient) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    const recipe = this.recipes.find(
      (r) => {
        return r.id === id;
      }
    );
    return recipe;
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe) {
    this.httpClient.post('https://ng-recipe-book-42f34.firebaseio.com/recipes.json', recipe)
    debugger
    this.recipes.push(recipe)
    this.recipesChanged.emit(this.recipes)
  }
}
