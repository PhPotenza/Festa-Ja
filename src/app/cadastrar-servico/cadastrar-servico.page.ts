import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastrar-servico.page.html',
  styleUrls: ['./cadastrar-servico.page.scss'],
})
export class CadastrarServicoPage implements OnInit {
  
  nome_servico: string = "";
  descricao_servico: string = "";
  tipo_servico: string = "";
  
  constructor (
      private router: Router,
      private storage: Storage,
      public toastCtrl: ToastController
  ){}

  ngOnInit() {
  }

  goToPerfilServico(){
  		this.router.navigate(['/perfil-servico']);
  }

}
