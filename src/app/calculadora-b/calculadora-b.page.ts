import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';
import { MbscFormOptions } from '@mobiscroll/angular';


@Component({
  selector: 'app-calculadora-b',
  templateUrl: './calculadora-b.page.html',
  styleUrls: ['./calculadora-b.page.scss'],
})
export class CalculadoraBPage implements OnInit {

  stepper1: number;
  stepper2: number;
  stepper3: number;
  stepper4: number;
  danger = 100;


  formSettings: MbscFormOptions = {
    lang: 'pt-BR',
    theme: 'ios'
};

  homens: number = 0;
  mulheres: number = 0;
  criancas: number = 0;
  adolescente: number = 0;
  horas: number = 0;
  dados: any = [];

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private actRoute: ActivatedRoute,
    public alertController: AlertController
 ) { }

  ngOnInit() {
  }

  formCalculadorac(){
    this.dados = [(this.homens)];
    this.storage.set('calculadora', this.dados);
    this.storage.get('calculadora').then((res)=>{
      console.log(res);
    });
    this.router.navigate(['/calculadora-c']);

    }

    

}
