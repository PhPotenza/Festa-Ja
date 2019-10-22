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

  id_servico: number=0;
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

    ionViewWillEnter(){
      this.storage.get('session_storage3').then((res)=>{
        this.anggota = res;
        this.nome_servico = this.anggota.Nome;
        this.tipo_servico = this.anggota.Tipo;
        this.descricao_servico = this.anggota.Descricao;
      });
    }

    async updateServico(){
      return new Promise(resolve => {
        this.storage.get('session_storage3').then(async (res)=>{
          this.anggota = res;
          this.id_servico = this.anggota.idServico;
      
      if(this.nome_servico==""){
          const toast = await this.toastCtrl.create({
            message: 'Nome Obrigatório',
            duration: 3000
          });
          toast.present();
      }else if(this.descricao_servico==""){
        const toast = await this.toastCtrl.create({
          message: 'Descrição Obrigatória',
          duration: 3000
        });
        toast.present();
      }else if(this.tipo_servico==""){
        const toast = await this.toastCtrl.create({
          message: 'Tipo de Serviço Obrigatório',
          duration: 3000
        });
        toast.present();
      }else{
  
        let body = {
          idServico: this.id_servico,
          nome: this.nome_servico,
          descricao: this.descricao_servico,
          tipo: this.tipo_servico,
          aksi: 'updateServico'
        };
  
        this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
          var alertpesan = data.msg;
          if(data.success){
            this.router.navigate(['/perfil-servico']);
            const toast = await this.toastCtrl.create({
              message: 'Alterado com Sucesso',
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
