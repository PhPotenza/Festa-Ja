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

  idUsuario: number;
  nome: string = "";
  email: string ="";
  cpf: string ="";
  celular: number;
  telefone: number;
  contato_secundario: number;
  anggota: any;
  password: string;
  username: string;

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
    });
  }

  async updatePerfil(){
    return new Promise(resolve => {
      this.storage.get('session_storage').then(async (res)=>{
        this.anggota = res;
        this.idUsuario = this.anggota.idUsuario;
        this.password = this.anggota.Senha;
        this.username = this.anggota.Login;
    if(this.nome==""){
      const toast = await this.toastCtrl.create({
        message: 'Nome Obrigátorio',
        duration: 3000
      });
      toast.present();
    }
    else{

      let body = {
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        celular: this.celular,
        telefone: this.telefone,
        contato_secundario: this.contato_secundario,
        idUsuario: this.idUsuario,
        aksi: 'updatePerfil'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        let alertpesan = data.msg;
        console.log(data);
        if(data.success){
          this.router.navigate(['/perfil-cliente'])
          const toast = await this.toastCtrl.create({
            message: 'Alterado com Sucesso',
            duration: 3000
          });
          toast.present();
/*
                    let body = {
      username: this.username,
      password: this.password,
      aksi: 'login'
    };
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
      var alertpesan = data.msg;
      if(data.success){
        this.storage.set('session_storage', data.result);
         this.router.navigate(['/perfil-cliente']);
      }
      else{
         const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
      }
    });
*/
        }else{
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
        }
      });
    }
      });
    });
  }

 formPerfilCliente(){
    this.router.navigate(['/perfil-cliente']);
  }

}