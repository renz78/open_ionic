import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  name: any;
  quantity: any;
  price: any;
  status: any;
  ch: boolean;
  product_id: any;
  st: any;
  rez: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl : ViewController,
    private httpClient: HttpClient,
    public navParams: NavParams) {
  }
  public closeModal(){
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.name = this.navParams.get('name');
    this.quantity = this.navParams.get('quantity');
    this.price = this.navParams.get('price');
    this.status = this.navParams.get('status');
    this.product_id = this.navParams.get('product_id');
    if (this.status == 1) {
      this.ch = true;
    } else {
      this.ch = false;
    }
    console.log(this.price);
    //console.log(wqe);
  }

  changeProduct(product_id: any, quantity: any, price: any, status: any){
    console.log(product_id + '' + quantity + '' + price);
    if (status == true) {
      this.st = 1;
    } else {
      this.st = 0;
    }
    this.rez = this.httpClient.get('http://www.maxshop.in.ua/products.php?event=updproduct&status='+this.st+'&product_id='+product_id+'&quantity='+quantity+'&price='+price+'');
    this.rez
    .subscribe(data => {
      console.log(data);
    })
  }

  logForm(form) {
    console.log(form.value.name);
    this.changeProduct(form.value.product_id, form.value.quantity, form.value.price, form.value.status);
    this.viewCtrl.dismiss();
  }

}
