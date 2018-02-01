import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  // selected cart items
  cartItems: any[] = [];
  // total cost of the items
  total: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.ready().then(() => {

      this.storage.get('cart').then((data) => {

        this.cartItems = data;

        // console.log(this.cartItems);
      if (this.cartItems.length > 0) {

        this.cartItems.forEach((item, index) => {

          this.total = this.total + ((item.product.price) * item.quantity)

          console.log(this.total)
        });
      }

      });

    });

  }
}
