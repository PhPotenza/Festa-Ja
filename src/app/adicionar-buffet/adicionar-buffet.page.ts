import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-adicionar-buffet',
  templateUrl: './adicionar-buffet.page.html',
  styleUrls: ['./adicionar-buffet.page.scss'],
})
export class AdicionarBuffetPage implements OnInit {

  nome: string="";
  tipo: string="";
  quant: number;
  unid: string ="";
  idEvento: number;
  anggota: any;

  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
  	private storage: Storage,
  	public toastCtrl: ToastController
  ) { }
  ngOnInit() {
  }

 async addBuffet(){
    return new Promise(resolve => {
      this.storage.get('session_storage2').then(async (res)=>{
        this.anggota = res;
        this.idEvento = this.anggota.idEvento;
    if(this.nome==""){
        const toast = await this.toastCtrl.create({
          message: 'Nome Obrigatório',
          duration: 3000
        });
        toast.present();
    }else if(this.tipo==""){
        const toast = await this.toastCtrl.create({
          message: 'Tipo Obrigatório',
          duration: 3000
        });
        toast.present();
    }else if(this.quant==0){
        const toast = await this.toastCtrl.create({
          message: 'Quantidade Obrigatória',
          duration: 3000
        });
        toast.present();
    }else if(this.unid==""){
      const toast = await this.toastCtrl.create({
        message: 'Unidade Obrigatória',
        duration: 3000
      });
      toast.present();
  }
    else{

      let body = {
        nome: this.nome,
        tipo: this.tipo,
        Quantidade: this.quant,
        Unidade: this.unid,
        IdEvento: this.idEvento,
        aksi: 'addBuffet'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/buffet']);
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

 formBuffet(){
    this.router.navigate(['/buffet']);
  }

}