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

  festas = [
    { name: 'Coxinha de Frango', isChecked: false },
    { name: 'Bolinha de Queijo', isChecked: false },
    { name: 'Mini Quibe frito', isChecked: false },
    { name: 'Croquete', isChecked: false },
    { name: 'Enroladinho de salsicha', isChecked: false },
    { name: 'Enroladinho de Presunto e Queijo', isChecked: false },
    { name: 'Pão de Queijo', isChecked: false },
    { name: 'Risole de Queijo e Presunto', isChecked: false },
    { name: 'Risole de Camarão', isChecked: false },
    { name: 'Pastel', isChecked: false },
    { name: 'Empadinha', isChecked: false },
    { name: 'Nuggets de Frango', isChecked: false },
    { name: 'Croissant', isChecked: false },
    { name: 'Trouxinha', isChecked: false },
    { name: 'Esfiha', isChecked: false },
    { name: 'Mini Pizza', isChecked: false },
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

  formCalculadorad(){
    this.router.navigate(['/calculadora-d']);
    console.log(this.festas);
    }
}


