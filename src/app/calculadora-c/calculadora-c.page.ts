import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-c',
  templateUrl: './calculadora-c.page.html',
  styleUrls: ['./calculadora-c.page.scss'],
})
export class CalculadoraCPage implements OnInit {

  coxinha_frango: boolean=false;
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
  festas: any = [];

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

  formCalculadorad(){
    this.festas = [(this.coxinha_frango, this.bolinha_queijo, this.quibe, this.croquete, this.enroladinho_salsicha, this.enroladinho_pq, this.pao_queijo, this.risole_pq, this.risole_camarao, this.pastel, this.empadinha, this.nuggets, this.croissant, this.trouxinha, this.esfiha, this.pizza)];
    this.storage.set('session_festas', this.festas);
    this.router.navigate(['/calculadora-d']);
    console.log(this.festas);
    }
}


