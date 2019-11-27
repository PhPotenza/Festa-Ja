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

  formSettings: MbscFormOptions = {
    lang: 'pt-BR',
    theme: 'ios'
};

  homens: number;
  mulheres: number;
  adolescentes: number;
  criancas: number;
  horas: number;
  dados: any=[];
  anggota: any;

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
    this.dados = [this.homens, this.mulheres, this.adolescentes, this.criancas];
    this.storage.set('session_dados', this.dados);
    this.router.navigate(['/calculadora-c']);
      console.log(this.dados);
    
  }
}
