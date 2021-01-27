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

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) { 
    this.films = this.httpClient.get('https://swapi.co/api/films');  
  }
 
  openDetails(film) {
    this.navCtrl.push('FilmDetailsPage', {film: film});
  }

}
