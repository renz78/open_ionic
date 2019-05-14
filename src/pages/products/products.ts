import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
//import { ModalPage } from '../modal/modal';
 


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  films: Observable<any>;
  prods: Observable<any>;
  prodarr: any;
  prodarr2: any;
  testCheckboxOpen: boolean;
  testCheckboxResult: any;
  rez: Observable<any>;

  constructor(
              public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams, 
              public storage: Storage, 
              private httpClient: HttpClient,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController
              )
  {  
    
  
    //this.storage.set('arr',this.prodarr);
    this.initializeItems();
    this.presentLoading();
  }

  //показує завантаження
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 700
    });
    loader.present();
  }

  //виклик модально вікна
  public openModal(prod: any){
    let data = { product_id : prod.product_id, name : prod.name, quantity : prod.quantity, price : prod.price, status : prod.status};
    let modalPage = this.modalCtrl.create('ModalPage',data);
    //console.log(data);
    modalPage.present();
  }    

  //виклик ActionSheet
  public presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  //формування списку товарів
  initializeItems() {
    this.prods = this.httpClient.get('http://www.maxshop.in.ua/products.php');
    this.prods
    .subscribe(data => {
      this.prodarr2 = data;
      this.prodarr = data;
      this.storage.set('name', JSON.stringify(this.prodarr));
      // Or to get a key/value pair
      this.storage.get('name').then((val) => {
        console.log('Your age is', val);
      });
    })
       
    return this.prodarr;
  }
 

  
  getItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();
    //console.log(this.storage.get('arr'));
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.prodarr = this.prodarr2.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      //this.initializeItems();
    }
  }

//изменение количества
  changeQuantity(product_id: any, quantity: any){
    console.log(product_id + '' + quantity);
    this.rez = this.httpClient.get('http://www.maxshop.in.ua/products.php?event=quantity&product_id='+product_id+'&quantity='+quantity+'');
    this.rez
    .subscribe(data => {
      console.log(data);
    })
  }
//изменение многиг параметров
  changeProduct(product_id: any, quantity: any, price: any){
    console.log(product_id + '' + quantity + '' + price);
    this.rez = this.httpClient.get('http://www.maxshop.in.ua/products.php?event=updproduct&product_id='+product_id+'&quantity='+quantity+'&price='+price+'');
    this.rez
    .subscribe(data => {
      console.log(data);
    })
  }

  doCheckbox(prod: any) {
    console.log(prod);
    
    
    let alert = this.alertCtrl.create({
      title: 'Редактирование товара:',
      message: prod.name,
      inputs: [
        {
          name: 'username',
          placeholder: 'Username',
          value: 'user'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
        // {
        //   name: 'product_id',
        //   label: 'ID',
        //   id: prod.product_id,
        //   placeholder: 'ID',
        //   value: prod.product_id,
        //   type: 'text' // here the error
        // },
        // {
        //   name: 'quantity',
        //   label: 'Количество',
        //   placeholder: '',
        //   value: prod.quantity,
        //   type: 'number' // here the error
        // },
        // {
        //   name: 'price',
        //   label: 'Цена',
        //   placeholder: '',
        //   value: prod.price,
        //   type: 'number' // here the error
        // },
        // {
        //   name: 'status',
        //   label: 'Статус',
        //   checked: ch,
        //   value: 'Статус',
        //   type: 'checkbox' // here the error

        // }
      ]
    });
    
    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });
    alert.addInput({
      type: 'text',
      label: 'Alderaan',
      value: prod.product_id,
      //checked: true
    });
    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: '1'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.changeProduct(prod.product_id, data.quantity, data.price);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }

  //викликає alert для видалення
  doDel(prod: any) {
    console.log(prod);
    let alert = this.alertCtrl.create({
      title: 'Уменьшить кол-во товара на:',
      message: prod.name,
      inputs: [
        {
          name: 'product_id',
          label: 'ID',
          //placeholder: 'ID',
          value: prod.product_id,
          type: 'text' // here the error
        },       
        {
          name: 'quantity',
          label: 'Количество',
          placeholder: '',
          
          type: 'number' // here the error
        }
      ]
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.changeQuantity(prod.product_id, -data.quantity);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        this.initializeItems();
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }

  //викликає alert для додавання
  doAdd(prod: any) {
    console.log(prod);
    let alert = this.alertCtrl.create({
      title: 'Увеличить кол-во товара на:',
      message: prod.name,
      inputs: [
        
        {
          name: 'product_id',
          label: 'ID',
          placeholder: 'ID',
          value: prod.product_id,
          type: 'text' // here the error
        },
        
        {
          name: 'quantity',
          label: 'Количество',
          placeholder: '',
          
          type: 'number' // here the error
        }
      ]
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.changeQuantity(prod.product_id, data.quantity);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        this.initializeItems();
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }

}
