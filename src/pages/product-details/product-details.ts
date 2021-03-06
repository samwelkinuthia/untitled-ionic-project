import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartPage } from "../cart/cart";
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";

@IonicPage({})
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})

export class ProductDetailsPage {
  product: any;
  reviews: any[] = [];
  WooCommerce: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public storage: Storage, public modalCtrl: ModalController,private WP: WoocommerceProvider) {

    this.product = this.navParams.get("product");

    console.log(this.product);

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {

      // console.log(JSON.parse(data.body))
      this.reviews = JSON.parse(data.body).product_reviews;

      console.log(this.reviews);

    }, (err) => {
      console.log(err)
    });
  }
  // FOR THE USER TO ADD A PARTICULAR PRODUCT TO THEIR CART
  addToCart(product) {

    this.storage.get("cart").then((data) => {

      if (data == null || data.length == 0) {

        data = [];

        data.push({
          "product": product,
          "quantity": 1,
          "amount": parseFloat(product.price)
        })

      } else {

        let added = 0;

        for (let i = 0; i < data.length; i++) {

          if (product.id == data[i].product.id) {

            let quantity = data[i].quantity;

            console.log("Already added to cart!");

            data[i].quantity = quantity + 1;

            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);

            added = 1;

          }

        }

        if (added == 0) {

          data.push({
            "product": product,
            "quantity": 1,
            "amount": parseFloat(product.price)
          })

        }

      }

      this.storage.set("cart", data).then(() => {

        console.log("Cart Updated");

        console.log(data);

        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();

      })
    })

  }
  // FOR THE USER TO VIEW ITEMS IN HIS/HER CART
  openCart() {

    this.modalCtrl.create(CartPage).present();

    console.log("function works");

  }

}
