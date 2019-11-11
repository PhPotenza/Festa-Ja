import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.page.html',
  styleUrls: ['./perfil-cliente.page.scss'],
})
export class PerfilClientePage implements OnInit {

  idUsuario: string= "";
  nome: string = "";
  email: string ="";
  cpf: string = "";
  celular: string = "";
  telefone: string = "";
  contato_secundario: string = "";
  anggota: any;
  display: boolean = true;
  cor: string = "light";
  cor2: string = "tertiary";
  icone: string = "create";



  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    public alertController: AlertController,
  	public toastCtrl: ToastController
  ) { }
  ngOnInit() {
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

 editar(){
    //this.router.navigate(['/editar-perfil']);
    if(this.display==true){
      this.display=false;
      this.icone="checkmark";
      this.cor="success";
      this.cor2="danger";
    }
    else{
      this.confirmar();
    }
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

  async updatePerfil(){
    return new Promise(resolve => {
      this.storage.get('session_storage').then(async (res)=>{
        this.anggota = res;
        this.idUsuario = this.anggota.idUsuario;
    if(this.cpf==""){
      const toast = await this.toastCtrl.create({
        message: 'CPF Obrigátorio',
        duration: 3000
      });
      toast.present();
    }
    else{

      let body = {
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
          const toast = await this.toastCtrl.create({
            message: 'Alterado com Sucesso',
            duration: 3000
          });
          toast.present();

        this.storage.set('session_storage', data.result);  //seta as novas informações na session
        this.display=true;
        this.icone="create";
        this.cor="light";
        this.cor2="tertiary";
      }
        else{
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

  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Alterar',
      message: '<strong>Deseja realmente alterar esses dados?</strong>',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'light',
        }, {
          text: 'Sim',
          handler: () => {
            this.updatePerfil();
          }
        }
      ]
    });

    await alert.present();
  }

  async cancelar(){
    if(this.display==false){
      const alert = await this.alertController.create({
        header: 'Alterar',
        message: '<strong>Deseja cancelar as alterações?</strong>',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'light',
          }, {
            text: 'Sim',
            handler: () => {
        this.display=true;
        this.icone="create";
        this.cor="light";
        this.cor2="tertiary";
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
          }
        ]
      });
  
      await alert.present();
      
    }
  }
}