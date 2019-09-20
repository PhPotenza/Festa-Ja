import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-servico',
  templateUrl: './editar-servico.page.html',
  styleUrls: ['./editar-servico.page.scss'],
})
export class EditarServicoPage implements OnInit {

  	constructor( 
        private router: Router,
        private storage: Storage,
        public toastCtrl: ToastController
    ){}

  	ngOnInit() {
  	}

    async alteracaoPerfilServico(){
    this.storage.clear();
    this.router.navigate(['/perfil-servico']);
    const toast = await this.toastCtrl.create({
        message: 'Informações atualizadas!',
        duration: 3000
      });
    toast.present();
  }
}
