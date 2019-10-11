import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { async } from 'q';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-editar-servico',
  templateUrl: './editar-servico.page.html',
  styleUrls: ['./editar-servico.page.scss'],
})
export class EditarServicoPage implements OnInit {

  nome_servico: string = "";
  descricao_servico: string = "";
  tipo_servico: string = "";
  anggota: any;

    constructor( 
        private router: Router,
        private storage: Storage,
        public toastCtrl: ToastController,
        private postPvdr: PostProvider
    ){}

    ngOnInit() {
    }

    //async alteracaoPerfilServico(){
    //this.storage.clear();
    //this.router.navigate(['/perfil-servico']);
    //const toast = await this.toastCtrl.create({
        //message: 'Informações atualizadas!',
        //duration: 3000
      //});
    //toast.present();
  //}

  async alterarServico(){
    return new Promise(resolve=> {
      this.storage.get('session_storage').then(async (res)=>{
        this.anggota = res;
        //this.idService = this.anggota.idService;
        
      if(this.nome_servico==""){
        const toast = await this.toastCtrl.create({
          message: 'Dê um nome ao seu serviço!',
          duration: 3000
        });
        toast.present();
      }else if(this.tipo_servico==""){
        const toast = await this.toastCtrl.create({
          message: 'Selecione um tipo para seu serviço!'
        });
      }else if(this.descricao_servico==""){
        const toast = await this.toastCtrl.create({
          message: 'Inclua uma descrição ao seu serviço!'
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
          this.router.navigate(['/perfil-servico']);
          const toast = await this.toastCtrl.create({
            message: 'Informações atualizadas com sucesso!',
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
