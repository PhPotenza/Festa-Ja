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
  nome_servico: string = "";
  descricao_servico: string = "";
  tipo_servico: string = "";
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

      if(this.nome_servico==""){
        const toast = await this.toastCtrl.create({
          message: 'Nome Obrigatório',
          duration: 3000
        });
        toast.present();
      }else if(this.tipo_servico==""){
        const toast = await this.toastCtrl.create({
          message: 'Selecione um tipo para seu serviço!',
          duration: 3000
        });
      }else if(this.descricao_servico==""){
        const toast = await this.toastCtrl.create({
          message: 'Descrição Obrigatória',
          duration: 3000
        });
      }else{
        let body = {
          Nome: this.nome_servico,
          Tipo: this.tipo_servico,
          Descricao: this.descricao_servico,
          aski: 'cadastrarServico'
        }
      

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/home']);
          const toast = await this.toastCtrl.create({
            message: 'Adicionado com Sucesso!',
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
      })
    })
  }

}
