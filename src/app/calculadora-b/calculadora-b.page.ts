import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';
import { MbscFormOptions } from '@mobiscroll/angular';


@Component({
  selector: 'app-calculadora-b',
  templateUrl: './calculadora-b.page.html',
  styleUrls: ['./calculadora-b.page.scss'],
})
export class CalculadoraBPage implements OnInit {

  formSettings: MbscFormOptions = {
    lang: 'pt-BR',
    theme: 'ios'
  };

  homens: number=0;
  mulheres: number=0;
  adolescentes: number=0;
  criancas: number=0;
  horas: number=0;
  dados: any;

  constructor(
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController
 ) { }

  ngOnInit() {
  }

  formCalculadorac(){
    this.dados = [this.homens, this.mulheres, this.adolescentes, this.criancas];
    this.storage.set('session_dados', this.dados);
      console.log(this.dados);
    this.router.navigate(['/calculadora-c']);
    
  }

}
