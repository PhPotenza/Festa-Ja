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

  Churras_bois = [
    { name: 'Alcatra', isChecked: false },
    { name: 'Maminha', isChecked: false },
    { name: 'Picanha', isChecked: false },
    { name: 'Contrafilé', isChecked: false },
    { name: 'Fraldinha', isChecked: false },
  ];

  Churras_porcos = [
    { name: 'Pernil', isChecked: false },
    { name: 'Picanha Suína', isChecked: false },
    { name: 'Lombo', isChecked: false },
    { name: 'Costelinha', isChecked: false },
    { name: 'Panceta', isChecked: false },
  ];

  Churras_frangos = [
    { name: 'Coxinha da asa', isChecked: false },
    { name: 'Asinha', isChecked: false },
    { name: 'Coração', isChecked: false },
  ];

  Churras_outros = [
    { name: 'Linguiça para churrasco', isChecked: false },
    { name: 'Salsichão', isChecked: false },
    { name: 'Linguiça Toscana', isChecked: false },
    { name: 'Pão de Alho', isChecked: false },
    { name: 'Queijo Coalho', isChecked: false },
    { name: 'Sal Grosso', isChecked: false },
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

  formCalculadorae(){
    this.router.navigate(['/calculadora-e']);
    console.log(this.Churras_bois, this.Churras_porcos, this.Churras_frangos, this.Churras_outros);
    }
}

