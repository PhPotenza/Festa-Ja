import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';


@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.page.html',
  styleUrls: ['./adicionar-evento.page.scss'],
})
export class AdicionarEventoPage implements OnInit {

  nome: string = "";
  tipo: string = "";
  idUsuario: number= 0;
  anggota: any;


  constructor(  	
    private router: Router,
  	private postPvdr: PostProvider,
    public toastCtrl: ToastController,
    private storage: Storage,
    ) 
    { }

  ngOnInit() {
  }

  async addEvento(){
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
    }else if(this.tipo==""){
        const toast = await this.toastCtrl.create({
          message: 'Tipo Obrigatória',
          duration: 3000
        });
        toast.present();
    }else{

      let body = {
        nome: this.nome,
        tipo: this.tipo,
        IdUsuario: this.idUsuario,
        aksi: 'addEvento'
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
