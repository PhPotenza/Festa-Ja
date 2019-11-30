import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-perfil-evento',
  templateUrl: './perfil-evento.page.html',
  styleUrls: ['./perfil-evento.page.scss'],
})
export class PerfilEventoPage implements OnInit {

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
  anggota: any;
  day1: number;
  month1: number;
  year1: number;
  mes1: number;
  minute1: number;
  hour1: number;
  hora1: number;
  minuto1: number;
  dia1: number;
  date2: string;
  time2: string;
  day2: number;
  month2: number;
  year2: number;
  mes2: number;
  minute2: number;
  hour2: number;
  hora2: number;
  minuto2: number;
  dia2: number;

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }
 
  ngOnInit() {
    this.actRoute.params.subscribe((data: any) =>{
      this.idEvento = data.id;
      let body = {
        idEvento: this.idEvento,
        aksi : 'selectEvento',
      }; 
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_storage2', data.result);
        }
      });
    });
  }

  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 2500,
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    

    this.actRoute.params.subscribe((data: any) =>{
      this.idEvento = data.id;
      let body = {
        idEvento: this.idEvento,
        aksi : 'selectEvento',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_storage2', data.result);
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
            this.day1 = this.anggota.day1;
            this.month1= this.anggota.month1;
            this.year1= this.anggota.year1;
            this.minute1= this.anggota.minute1;
            this.hour1=this.anggota.hour1;
            this.date2 = this.anggota.Data_Fim;
            this.time2 = this.anggota.Hora_Fim;
            this.day2 = this.anggota.day2;
            this.month2= this.anggota.month2;
            this.year2= this.anggota.year2;
            this.minute2= this.anggota.minute2;
            this.hour2=this.anggota.hour2;
            console.log(res);
            if(this.month1<10){
                this.mes1=0 + this.month1;
            }else{
              this.mes1=this.month1;
            }
            if(this.hour1<10){
              this.hora1=0 + this.hour1;
          }else{
            this.hora1=this.hour1;
          }
          if(this.minute1<10){
            this.minuto1=0 + this.minute1;
        }else{
          this.minuto1=this.minute1;
        }
        if(this.day1<10){
          this.dia1=0 + this.day1;
      }else{
        this.dia1=this.day1;
      }   if(this.month2<10){
        this.mes2=0 + this.month2;
    }else{
      this.mes2=this.month2;
    }
    if(this.hour2<10){
      this.hora2=0 + this.hour2;
  }else{
    this.hora2=this.hour2;
  }
  if(this.minute2<10){
    this.minuto2=0 + this.minute2;
}else{
  this.minuto2=this.minute2;
}
if(this.day2<10){
  this.dia2=0 + this.day2;
}else{
this.dia2=this.day2;
}
          });
        }
      });
    });
    return await loading.present();
  }

  EditarEvento(){
    this.router.navigate(['/editar-evento']);
  }

  async delEvento(){

  	let body = {
  			aksi : 'delEvento',
  			idEvento : this.idEvento
  		};

  		this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
        
        var alertpesan = data.msg;
        if(data.success){
        const toast = await this.toastCtrl.create({
          message: 'Deletado com Sucesso.',
          duration: 2000
        });
        toast.present();
        this.ionViewWillEnter();
      }
        else{
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 2000
        });
        toast.present();
      }
  		});
      this.router.navigate(['/home']);
  }

  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Deletar',
      message: '<strong>Deseja deletar o evento ' + this.NomeEvento + '?</strong>',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'light',
          handler: (blah) => {
            console.log('Deletamento Cancelado');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.delEvento();
            console.log('Deletado');
          }
        }
      ]
    });

    await alert.present();
  }


  formBuffet(id){
        this.actRoute.params.subscribe((data: any) =>{
      this.idEvento = data.id;
       this.router.navigate(['/buffet/'+ id]);
    });
   
  } 
  formConvidados(){
    this.router.navigate(['/convidados']);
  }
  formServico(id){
    this.actRoute.params.subscribe((data: any) =>{
    this.idEvento = data.id;
    this.router.navigate(['/servicos-contratados/' + id]);
  });
  }
}
