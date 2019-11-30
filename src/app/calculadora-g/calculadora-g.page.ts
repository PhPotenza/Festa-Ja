import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-g',
  templateUrl: './calculadora-g.page.html',
  styleUrls: ['./calculadora-g.page.scss'],
})
export class CalculadoraGPage implements OnInit {
  
  brigadeiro: boolean=false;
  beijinho: boolean=false;
  bicho_pe: boolean=false;
  brigadeiro_colher: boolean=false;
  bolo: boolean=false;
  torta: boolean=false;
  palha_italiana: boolean=false;
  quindim: boolean=false;
  petit_gateau: boolean=false;
  cupcake: boolean=false;
  maca_amor: boolean=false;
  doces: any;
  item_doces: number=0;
  
  constructor(
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController
 ) { }

  ngOnInit() {
  }

  formCalculadorah(){
    this.doces = [this.brigadeiro, this.beijinho, this.bicho_pe, this.brigadeiro_colher, this.bolo, this.torta, this.palha_italiana, this.quindim, this.petit_gateau, this.cupcake, this.maca_amor];
    
    this.doces.forEach(element => {
      if(element == true){
        this.item_doces ++;
      }
    });
    
    this.storage.set('session_doces', this.doces);
    this.storage.set('session_item_ddoces', this.item_doces);
    this.router.navigate(['/calculadora-h']);
    console.log(this.doces);
    }
}
