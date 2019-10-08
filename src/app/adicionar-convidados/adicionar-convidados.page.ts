import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { async } from 'q';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-adicionar-convidados',
  templateUrl: './adicionar-convidados.page.html',
  styleUrls: ['./adicionar-convidados.page.scss'],
})
export class AdicionarConvidadosPage implements OnInit {

  nome_convidado: string = "";
  categoria_convidado: string = "";
  anggota:any;

  constructor (
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider
  ){}

  ngOnInit() {
  }

  //apagar se estiver com o banco de dados
  goToConvidados(){
    this.router.navigate(['/convidados']);
  }

  async cadastrarServico(){
    return new Promise(resolve=> {
      this.storage.get('session_storage').then(async (res)=>{
        this.anggota = res;

      if(this.nome_convidado==""){
        const toast = await this.toastCtrl.create({
          message: 'Dê um nome ao seu serviço!',
          duration: 3000
        });
        toast.present();
      }else if(this.categoria_convidado==""){
        const toast = await this.toastCtrl.create({
          message: 'Selecione um tipo para seu serviço!'
        });
      }else{
        let body = {
          Nome: this.nome_convidado,
          Categoria: this.categoria_convidado,
          aski: 'adionarConvidado'
        }
      

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/convidados']);
          const toast = await this.toastCtrl.create({
            message: 'Convidado adicionado com sucesso!',
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
