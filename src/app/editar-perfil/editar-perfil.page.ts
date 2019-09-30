import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  nome: string = "";
  email: string ="";
  cpf: string = "";
  celular: string = "";
  telefone: string = "";
  contato_secundario: string = "";
  anggota: any;

  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
  	private storage: Storage,
  	public toastCtrl: ToastController
  ) { }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.nome = this.anggota.Nome,
      this.email = this.anggota.Email;
      this.cpf = this.anggota.CPF;
      this.celular = this.anggota.Celular;
      this.telefone = this.anggota.Telefone;
      this.contato_secundario = this.anggota.SecunContat;
      console.log(res);
    });
  }

 formPerfilCliente(){
    this.router.navigate(['/perfil-cliente']);
  }

}