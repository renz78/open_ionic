import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {
  options: BarcodeScannerOptions;
  encodText: string = '';
  encodedData: any = {};
  scannedData: any = {};
  constructor(public navCtrl: NavController, public scanner: BarcodeScanner) {
  }
  scan(){
    this.options = {
      prompt: 'Сканировать код'
    }
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      //alert (data);
    }, (err) => {

    })
  }
  encode(){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodText).then((data) => {

    }, (err) => {

    })
  }
}
