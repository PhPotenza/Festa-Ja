import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-h',
  templateUrl: './calculadora-h.page.html',
  styleUrls: ['./calculadora-h.page.scss'],
})
export class CalculadoraHPage implements OnInit {


  suprimentos: any =[];
  
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

  formCalculadorai(){
    this.router.navigate(['/calculadora-i']);
    console.log(this.suprimentos);
    }
}