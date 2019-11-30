import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-h',
  templateUrl: './calculadora-h.page.html',
  styleUrls: ['./calculadora-h.page.scss'],
})
export class CalculadoraHPage implements OnInit {

  pratos: boolean=false;
  copos: boolean=false;
  talheres: boolean=false;
  guardanapos: boolean=false;
  suprimentos: any;

  constructor(
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController
 ) { }

  ngOnInit() {
  }

  formCalculadorai(){
    this.suprimentos = [this.pratos, this.copos, this.talheres, this.guardanapos];
    this.storage.set('session_suprimentos', this.suprimentos);
    this.router.navigate(['/calculadora-i']);
    console.log(this.suprimentos);
  }

    
}