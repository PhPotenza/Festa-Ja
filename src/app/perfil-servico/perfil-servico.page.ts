import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';

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
        public toastCtrl: ToastController
    ){}

  	ngOnInit() {
  	}

    goToEditarServico() {
        this.router.navigate(['/editar-servico']);
    }
}