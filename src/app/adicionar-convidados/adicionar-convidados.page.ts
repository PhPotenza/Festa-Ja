import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adicionar-convidados',
  templateUrl: './adicionar-convidados.page.html',
  styleUrls: ['./adicionar-convidados.page.scss'],
})
export class AdicionarConvidadosPage implements OnInit {

  nome_convidado: string = "";

  constructor (
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController
  ){}

  ngOnInit() {
  }

  goToConvidados(){
    this.router.navigate(['/convidados']);
}
}
