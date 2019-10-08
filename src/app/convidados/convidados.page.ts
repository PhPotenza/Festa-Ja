import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-convidados',
  templateUrl: './convidados.page.html',
  styleUrls: ['./convidados.page.scss'],
})
export class ConvidadosPage implements OnInit {

  nome_convidado: string = "";
  tipo_convidado: string = "";

  constructor (
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController
){}

  ngOnInit() {
  }

  goToAdicionarConvidados(){
    this.router.navigate(['/adicionar-convidados']);
}

}
