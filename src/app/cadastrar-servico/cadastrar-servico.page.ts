import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-cadastrar-servico',
  templateUrl: './cadastrar-servico.page.html',
  styleUrls: ['./cadastrar-servico.page.scss'],
})
export class CadastrarServicoPage implements OnInit {
  
  idUsuario: number=0;
  nome: string = "";
  descricao: string = "";
  tipo: string = "";
  anggota: any;
  
  constructor (
      private router: Router,
      private storage: Storage,
      public toastCtrl: ToastController,
      private postPvdr: PostProvider,
  ){}

  ngOnInit() {
  }

  goToPerfilServico(){
  		this.router.navigate(['/perfil-servico']);
  }

  async cadastrarServico(){
    return new Promise(resolve => {
      this.storage.get('session_storage').then(async (res)=>{
        this.anggota = res;
        this.idUsuario = this.anggota.idUsuario;
    if(this.nome==""){
        const toast = await this.toastCtrl.create({
          message: 'Nome Obrigatório',
          duration: 3000
        });
        toast.present();
    }else if(this.descricao==""){
      const toast = await this.toastCtrl.create({
        message: 'Descrição Obrigatória',
        duration: 3000
      });
      toast.present();
    }else if(this.tipo==""){
      const toast = await this.toastCtrl.create({
        message: 'Tipo de Serviço Obrigatório',
        duration: 3000
      });
      toast.present();
    }else{

      let body = {
        IdUsuario: this.idUsuario,
        nome: this.nome,
        descricao: this.descricao,
        tipo: this.tipo,
        aksi: 'cadastrarServico'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/home']);
          const toast = await this.toastCtrl.create({
            message: 'Adicionado com Sucesso',
            duration: 3000
          });
          toast.present();
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
}
