import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  idService: number=0;
  Nome: string = "";
  Descricao: string = "";
  Tipo: string = "";
  anggota: any;

    constructor( 
        private router: Router,
        private storage: Storage,
        private actRoute: ActivatedRoute,
        public toastCtrl: ToastController,
        private postPvdr: PostProvider
    ){} 

    ngOnInit() {
      this.actRoute.params.subscribe((data: any) =>{
        this.idService = data.id;
        let body = {
          idService: this.idService,
          aksi : 'selectServico'
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          if(data.success){
            this.storage.set('session_storage_editar_servico', data.result);
          }
        });
    });
    }

    ionViewWillEnter(){
      this.storage.get('session_storage_editar_servico').then((res)=>{
        this.anggota = res;
        this.Nome = this.anggota.Nome;
        this.Tipo = this.anggota.Tipo;
        this.Descricao = this.anggota.Descricao;
      });
    }

    async updateService(){
      return new Promise(resolve => {
        this.storage.get('session_storage_editar_servico').then(async (res)=>{
          this.anggota = res;
          this.idService = this.anggota.idServico;
      
      if(this.Nome==""){
          const toast = await this.toastCtrl.create({
            message: 'Nome Obrigatório',
            duration: 3000
          });
          toast.present();
      }else if(this.Descricao==""){
        const toast = await this.toastCtrl.create({
          message: 'Descrição Obrigatória',
          duration: 3000
        });
        toast.present();
      }else if(this.Tipo==""){
        const toast = await this.toastCtrl.create({
          message: 'Tipo de Serviço Obrigatório',
          duration: 3000
        });
        toast.present();
      }else{
  
        let body = {
          idServico: this.idService,
          Nome: this.Nome,
          Descricao: this.Descricao,
          Tipo: this.Tipo,
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
