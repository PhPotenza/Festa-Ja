import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-c',
  templateUrl: './calculadora-c.page.html',
  styleUrls: ['./calculadora-c.page.scss'],
})
export class CalculadoraCPage implements OnInit {

  coxinha: boolean=false;
  bolinha_queijo: boolean=false;
  quibe: boolean=false;
  croquete: boolean=false;
  enroladinho_salsicha: boolean=false;
  enroladinho_pq: boolean=false;
  pao_queijo: boolean=false;
  risole_pq: boolean=false;
  risole_camarao: boolean=false;
  pastel: boolean=false;
  empadinha: boolean=false;
  nuggets: boolean=false;
  croissant: boolean=false;
  trouxinha: boolean=false;
  esfiha: boolean=false;
  pizza: boolean=false;
  festas: any;
  item_festas: number=0;

  constructor(
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController
 ) { }

  ngOnInit() {
  }

  formCalculadorad(){
    this.festas = [this.coxinha, this.bolinha_queijo, this.quibe, this.croquete, this.enroladinho_salsicha, this.enroladinho_pq, this.pao_queijo, this.risole_pq, this.risole_camarao, this.pastel, this.empadinha, this.nuggets, this.croissant, this.trouxinha, this.esfiha, this.pizza];
    
    this.festas.forEach(element => {
      if(element == true){
        this.item_festas ++;
      }
    });

    this.storage.set('session_festas', this.festas);
    this.storage.set('session_item_festas', this.item_festas);
    this.router.navigate(['/calculadora-d']);
    console.log(this.item_festas, this.festas);
  }
}