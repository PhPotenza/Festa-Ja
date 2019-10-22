import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.page.html',
  styleUrls: ['./editar-evento.page.scss'],
})
export class EditarEventoPage implements OnInit {

  idEvento: number;
  NomeEvento: string;
  TipoEvento: string;
  CEP: string;
  Cidade: string;
  Estado: string;
  Bairro: string;
  Endereco: string;
  Numero: number;
  Complemento: string;
  date1: string;
  time1: string;
  date2: string;
  time2: string;
  anggota: any;

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage2').then((res)=>{
      this.anggota = res;
      this.NomeEvento = this.anggota.NomeEvento;
      this.TipoEvento = this.anggota.Tipo;
      this.CEP = this.anggota.CEP;
      this.Estado = this.anggota.Estado;
      this.Cidade = this.anggota.Cidade;
      this.Endereco = this.anggota.Endereco;
      this.Bairro = this.anggota.Bairro;
      this.Numero = this.anggota.Numero;
      this.Complemento = this.anggota.Complemento;
      this.date1 = this.anggota.Data_Inicio;
      this.time1 = this.anggota.Hora_Inicio;
      this.date2 = this.anggota.Data_Fim;
      this.time2 = this.anggota.Hora_Fim;
    });
  }

  async updateEvento(){
    return new Promise(resolve => {
      this.storage.get('session_storage2').then(async (res)=>{
        this.anggota = res;
        this.idEvento = this.anggota.idEvento;
    if(this.NomeEvento==""){
        const toast = await this.toastCtrl.create({
          message: 'Nome Obrigatório',
          duration: 3000
        });
        toast.present();
    }
    else{

      let body = {
        nome: this.NomeEvento,
        tipo: this.TipoEvento,
        cep: this.CEP,
        estado: this.Estado,
        cidade: this.Cidade,
        bairro: this.Bairro,
        endereco: this.Endereco,
        numero: this.Numero,
        complemento: this.Complemento,
        date1: this.date1,
        time1: this.time1,
        date2: this.date2,
        time2: this.time2,
        idEvento: this.idEvento,
        aksi: 'updateEvento'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/perfil-evento/' + this.idEvento]);
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
