import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-meus-servicos',
  templateUrl: './meus-servicos.page.html',
  styleUrls: ['./meus-servicos.page.scss'],
})

export class MeusServicosPage implements OnInit {

  idUsuario: number;
  idService: number;
  anggota: any;
  servicos: any = [];
  limit: number = 13;
  start: number = 0;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private postPvdr: PostProvider
  ) { }

  ngOnInit() {
     this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.idUsuario = this.anggota.idUsuario;
      console.log(res);
    });
  }

ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.idUsuario = this.anggota.idUsuario;
      console.log(res);
    });
    this.servicos = [];
    this.start = 0;
    this.loadServico();
  }  

  loadServico() {
    return new Promise(resolve => {
      this.storage.get('session_storage').then((res)=>{
        this.anggota = res;
        this.idUsuario = this.anggota.idUsuario;
        let body = {
          idUsuario: this.idUsuario,
          limit : this.limit,
          start : this.start,
          aksi : 'getservico',
        };

        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for (let servico of data.result) {
            this.servicos.push(servico);
          }
          resolve(true);
        });
      });
    });
  }

  loadData(event:any){
    this.start += this.limit;
  	setTimeout(() =>{
  	this.loadServico().then(()=>{
  		event.target.complete();
  	});
  	}, 500);
  }

  doRefresh(event){
  	setTimeout(() =>{
  		this.ionViewWillEnter();
  		event.target.complete();
  	}, 500);
  }

  goToPerfilServico(id){
  	this.router.navigate(['/perfil-servico/' + id]);
  }

  goToEditarServico(id){
    this.router.navigate(['/editar-servico/' + id]);
}
  

  goToCadastrarServico(){
    this.router.navigate(['/cadastrar-servico']);
  }
  
  async delEvento(id){

  	let body = {
  			aksi : 'delServico',
  			idService : id
  		};

  		this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
        
        var alertpesan = data.msg;
        if(data.success){
          this.presentLoadingWithOptions();
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
      
  }

  async confirmar(id,nome) {
    const alert = await this.alertController.create({
      header: 'Deletar',
      message: '<strong>Deseja deletar o serviço ' + nome + '?</strong>',
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
            this.delEvento(id);
            console.log('Deletado');
          }
        }
      ]
    });

    await alert.present();
  }

  

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 2500,
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
