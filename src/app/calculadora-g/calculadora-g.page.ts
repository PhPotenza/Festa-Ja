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

  doces = [
    { name: 'Brigadeiro', isChecked: false },
    { name: 'Beijinho', isChecked: false },
    { name: 'Bicho de Pé', isChecked: false },
    { name: 'Bem Casado', isChecked: false },
    { name: 'Brigadeiro de Colher', isChecked: false },
    { name: 'Bolo', isChecked: false },
    { name: 'Torta', isChecked: false },
    { name: 'Palha Italiana', isChecked: false },
    { name: 'Maçã do Amor', isChecked: false },
    { name: 'Quindim', isChecked: false },
    { name: 'Pudim', isChecked: false },
    { name: 'Petit Gateau', isChecked: false },
    { name: 'Donuts', isChecked: false },
    { name: 'Cupcake', isChecked: false },
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

  formCalculadorah(){
    this.router.navigate(['/calculadora-h']);
    console.log(this.doces);
    }
}
