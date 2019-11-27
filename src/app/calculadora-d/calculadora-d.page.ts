import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-d',
  templateUrl: './calculadora-d.page.html',
  styleUrls: ['./calculadora-d.page.scss'],
})
export class CalculadoraDPage implements OnInit {

  alcatra: boolean=false;
  maminha: boolean=false;
  picanha: boolean=false;
  contrafile: boolean=false;
  fraldinha: boolean=false;
  pernil: boolean=false;
  picanha_suina: boolean=false;
  lombo: boolean=false;
  costelinha: boolean=false;
  panceta: boolean=false;
  coxinha_asa: boolean=false;
  asinha: boolean=false;
  coracao: boolean=false;
  coxinha_frango: boolean=false;
  salsichao: boolean=false;
  linguica_toscana: boolean=false;
  queijo_coalho: boolean=false;
  pao_alho: boolean=false;
  churrasco: any=[];

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

  formCalculadorae(){
    this.churrasco = [(this.maminha, this.picanha, this.contrafile, this.fraldinha, this.pernil, this.picanha_suina, this.lombo, this.costelinha, this.panceta, this.coxinha_asa, this.asinha, this.coracao, this.coxinha_frango, this.salsichao, this.linguica_toscana, this.queijo_coalho, this.pao_alho)];
    this.storage.set('session_churrasco', this.churrasco);
    this.router.navigate(['/calculadora-e']);
    console.log(this.churrasco);
  }
}

