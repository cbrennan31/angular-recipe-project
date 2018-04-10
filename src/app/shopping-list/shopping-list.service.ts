import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core'


export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>()
  startedEditing = new EventEmitter<boolean>()

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount))
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  getIngredients() {
    return this.ingredients.slice()
  }

  getIngredient(index) {
    return this.ingredients[index]
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  startEditing(index) {
    this.startedEditing.emit(index)
  }

  updateIngredient(i, name, amount) {
    this.ingredients[i] = new Ingredient(name, amount)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  deleteIngredient(index) {
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}
