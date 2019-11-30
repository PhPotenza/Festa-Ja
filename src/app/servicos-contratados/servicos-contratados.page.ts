import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-servicos-contratados',
  templateUrl: './servicos-contratados.page.html',
  styleUrls: ['./servicos-contratados.page.scss'],
})
export class ServicosContratadosPage implements OnInit {

  idListaService: number;
  idEvento: number;
  idService: number;
  Nome: string = "";
  Tipo: string= "";
  Descricao: string = "";
  anggota: any;
  servicos: any = [];
  limit: number = 13;
  start: number = 0;

  constructor(
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    private actRoute: ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private postPvdr: PostProvider
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) =>{
      this.idEvento = data.id;
      let body = {
        idEvento: this.idEvento,
        aksi : 'selectServicosContratados'
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_storage_lista_servicos', data.result);
        }
      });
  });
}
  
  ionViewWillEnter(){
    this.actRoute.params.subscribe((data: any) =>{
      this.idEvento = data.id;
      let body = {
        idEvento: this.idEvento,
        aksi : 'selectServicosContratados'
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_storage_lista_servicos', data.result);
          this.storage.get('session_storage_lista_servicos').then((res)=>{
      this.anggota = res;
      this.idEvento = this.anggota.idEvento;
      this.idService = this.anggota.idService;
      this.idListaService = this.anggota.idListaService; 
      this.Nome = this.anggota.Nome;
      this.Tipo = this.anggota.Tipo;
      this.Descricao = this.anggota.Descricao;
      console.log(res);
         });
       }
      });
    });
    this.servicos = [];
    this.start = 0;
    this.loadIdServico();
  }  

  loadIdServico() {
    return new Promise(resolve => {
      this.storage.get('session_storage_lista_servicos').then((res)=>{
        this.anggota = res;
        this.idEvento = this.anggota.idEvento;
        let body = {
          idEvento: this.idEvento,
          limit : this.limit,
          start : this.start,
          aksi : 'getServicosContratados',
        };

        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          console.log(data);
          for (let servico of data.result) {
            this.servicos.push(servico);
          }
          resolve(true);
        });

        // this.loadDadosServico();

        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          console.log(data);
          for (let servico of data.result) {
            this.servicos.push(servico);
          }
          resolve(true);
        });
      });
    });
  }

  /*
  loadDadosServico(){
    return new Promise(resolve => {
    this.storage.get('session_storage_lista_servicos').then((res)=>{
      this.anggota = res;
      this.idService = this.anggota.idService;
      let body = {
        idService: this.idService,
        aksi : 'getDadosServicosContratados',
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        console.log(data);
        for (let servico of data.result) {
          this.servicos.push(servico);
        }
        resolve(true);
      });
    });
    });
  }
*/
  loadData(event:any){
    this.start += this.limit;
  	setTimeout(() =>{
  	this.loadIdServico().then(()=>{
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

  goToCadastrarServico(){
    this.router.navigate(['/pesquisar-servico']);
  }
  
  async delListaService(id){
  	let body = {
  			aksi : 'delListaService',
  			idListaService : id
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

  async confirmar(id) {
    const alert = await this.alertController.create({
      header: 'Deletar',
      message: '<strong>Deseja deletar esse serviço?</strong>',
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
            this.delListaService(id);
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