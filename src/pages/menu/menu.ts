import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage} from "../home/home";
import { ProductsByCategoryPage } from "../products-by-category/products-by-category";
import { SignupPage } from "../signup/signup";
import { LoginPage } from "../login/login";
import { Storage } from "@ionic/storage";
import { CartPage } from "../cart/cart";
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";

@IonicPage({})

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: any;
  WooCommerce: any;
  categories:any[];
  loggedIn: boolean;
  user: any;

  @ViewChild('content') childCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController, private WP: WoocommerceProvider) {

    this.homePage = HomePage;

    this.categories = [];

    this.user = {};

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync("products/categories").then((data) => {

      // console.log(JSON.parse(data.body).product_categories);
      let temp:any[] = JSON.parse(data.body).product_categories;

      for (let i = 0; i < temp.length; i++){

        if(temp[i].parent == 0){
          // USING A SINGLE ICON FOR ALL CATEGORIES...COZ OF TIME AND STUFF REASONS :D
          temp[i].icon = "arrow-dropright-circle";
          // REPEAT MANY TIMES FOR ALL  CATEGORIES
          // if (temp[i].slug == "clothing"){
          //   temp[i].icon = "shirt";
          // }

          this.categories.push(temp[i])
        }

      }

      console.log(this.categories);

    });

  }

  ionViewDidEnter() {

    this.storage.ready().then(() => {

      this.storage.get('userLogin').then((userLogin) => {

        if (userLogin != null) {

          // console.log("HOORAY");
          this.user = userLogin.user;

          // console.log(this.user);

          this.loggedIn = true;
          console.log(this.loggedIn);

        }

      });

    });

  }



  openCategory(category) {

    this.childCtrl.setRoot(ProductsByCategoryPage, {"category": category});

  }

  //for navigations

  openPage(pageName: string) {

    if (pageName == "signup") {

      this.navCtrl.push(SignupPage);

    }

    if (pageName == "login") {

      this.navCtrl.push(LoginPage)

    }

    if (pageName == "logout") {

      this.storage.remove('userLogin').then(() => {

        this.user = {};

        this.loggedIn = false;
        console.log(this.loggedIn);

      });

    }

    if (pageName == "cart") {

      let modal = this.modalCtrl.create(CartPage);

      modal.present();

    }

  }


}
