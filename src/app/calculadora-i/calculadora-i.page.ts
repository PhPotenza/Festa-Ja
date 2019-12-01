import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-calculadora-i',
  templateUrl: './calculadora-i.page.html',
  styleUrls: ['./calculadora-i.page.scss'],
})
export class CalculadoraIPage implements OnInit {

  anggota: any;
  homens: number;
  mulheres: number;
  adolescentes: number;
  criancas: number;
  
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

}
