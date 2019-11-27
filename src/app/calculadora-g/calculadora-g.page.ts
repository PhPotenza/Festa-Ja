import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
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
  doces: any[];
  
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

  formCalculadorah(){
    this.doces = [(this.brigadeiro, this.beijinho, this.bicho_pe, this.brigadeiro_colher, this.bolo, this.torta, this.palha_italiana, this.quindim, this.petit_gateau, this.cupcake, this.maca_amor)];
    this.storage.set('session_doces', this.doces);
    this.router.navigate(['/calculadora-h']);
    console.log(this.doces);
    }
}
