import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-e',
  templateUrl: './calculadora-e.page.html',
  styleUrls: ['./calculadora-e.page.scss'],
})
export class CalculadoraEPage implements OnInit {

  porcoess = [
    { name: 'Mandioca Frita', isChecked: false },
    { name: 'Batata frita', isChecked: false },
    { name: 'Amendoim', isChecked: false },
    { name: 'Torresmo', isChecked: false },
    { name: 'Linguiça Acebolada', isChecked: false },
    { name: 'Bolinho de Arroz', isChecked: false },
    { name: 'Frango a passarinho', isChecked: false },
    { name: 'Medalhão de Frango', isChecked: false },
    { name: 'Polenta Frita', isChecked: false },
    { name: 'Bolinho de Bacalhau', isChecked: false },
    { name: 'Espetinho', isChecked: false },
    { name: 'Tilápia Frita', isChecked: false },
    { name: 'Batata Rústica', isChecked: false },
    { name: 'Iscas de Filé', isChecked: false },
    { name: 'Azeitona Temperada', isChecked: false },
    { name: 'Tábuas de Frios', isChecked: false },
  ];

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

  formCalculadoraf(){
    this.router.navigate(['/calculadora-f']);
    console.log(this.porcoess);
    }
}