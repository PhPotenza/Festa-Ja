import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-perfil-servico',
  templateUrl: './perfil-servico.page.html',
  styleUrls: ['./perfil-servico.page.scss'],
})
export class PerfilServicoPage implements OnInit {
  
    nome_servico: string = "";
    descricao_servico: string = "";
    foto_perfil_servico: string = "";
    comentarios: string = "";
    
    constructor( 
        private router: Router,
        private storage: Storage,
        public toastCtrl: ToastController,
        public actionSheetController: ActionSheetController
    ){}

    ngOnInit() {
    }

    goToEditarServico() {
        this.router.navigate(['/editar-servico']);
    }

    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Albums',
        buttons: [{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        }, {
          text: 'Play (open modal)',
          icon: 'arrow-dropright-circle',
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
}