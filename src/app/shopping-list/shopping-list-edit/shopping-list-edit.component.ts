import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs/subscription'

import { ShoppingListService } from '../shopping-list.service'

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})

export class ShoppingListEditComponent implements OnInit {
  @ViewChild('form') shoppingListForm: NgForm;
  defaultAmount = 1;
  editMode: boolean = false;
  editedItem: Ingredient;
  editedItemIndex: number

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    let that = this

    that.subscription = that.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        that.editedItemIndex = index;
        that.editMode = true
        that.editedItem = that.shoppingListService.getIngredient(index)
        that.shoppingListForm.setValue({
          name: that.editedItem.name,
          amount: that.editedItem.amount
        })
      }
    )
  }

  onClearForm() {
    this.shoppingListForm.resetForm()
    this.editMode = false
  }

  onSubmit() {
    const name = this.shoppingListForm.value.name
    const amount = this.shoppingListForm.value.amount

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, name, amount)
    } else {
      this.shoppingListService.addIngredient(name, amount)
    }

    this.onClearForm()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClearForm()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
