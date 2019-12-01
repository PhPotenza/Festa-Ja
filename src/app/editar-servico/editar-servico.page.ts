import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
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
  Estado: string = "";
  Cidade: string = "";
  Celular: string = "";
  Telefone: string = "";
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
            this.storage.set('session_storage_servico', data.result);
          }
        });
    });
    }

    ionViewWillEnter(){
      this.actRoute.params.subscribe((data: any) =>{
        this.idService = data.id;
        let body = {
          idService: this.idService,
          aksi : 'selectServico'
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          if(data.success){
            this.storage.set('session_storage_servico', data.result);
      this.storage.get('session_storage_servico').then((res)=>{
        this.anggota = res;
        this.Nome = this.anggota.Nome;
        this.Tipo = this.anggota.Tipo;
        this.Descricao = this.anggota.Descricao;
        this.Estado = this.anggota.Estado;
        this.Cidade = this.anggota.Cidade;
        this.Celular = this.anggota.Celular;
        this.Telefone = this.anggota.Telefone;
           });
         }
        });
      });
    }

    async updateService(){
      return new Promise(resolve => {
        this.storage.get('session_storage_servico').then(async (res)=>{ 
          this.anggota = res;
          this.idService = this.anggota.idService;
          console.log(res);
      
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
      }else  if(this.Estado==""){
        const toast = await this.toastCtrl.create({
          message: 'Estado Obrigatório',
          duration: 3000
        });
        toast.present();
      }else if(this.Cidade==""){
        const toast = await this.toastCtrl.create({
          message: 'Cidade Obrigatória',
          duration: 3000
        });
        toast.present();
      }else if(this.Celular==""){
        const toast = await this.toastCtrl.create({
          message: 'Celular de Serviço Obrigatório',
          duration: 3000
        });
        toast.present();
      }else {
  
        let body = {
          idService: this.idService,
          Nome: this.Nome,
          Descricao: this.Descricao,
          Tipo: this.Tipo,
          Estado: this.Estado,
          Cidade: this.Cidade,
          Celular: this.Celular,
          Telefone: this.Telefone,
          aksi: 'updateServico'
        };
  
        this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
          console.log(data);
          var alertpesan = data.msg;
          if(data.success){
            this.router.navigate(['/perfil-servico/' + this.idService]);
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
