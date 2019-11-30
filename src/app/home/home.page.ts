import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';
import {  MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  anggota: any;
  mes1: number;
  eventos: any = [];
  idUsuario: number;
  limit: number = 13;
  start: number = 0;
  pesquisar: string = "";
  tipo: string = "todos";
  chave: boolean = true;

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private actRoute: ActivatedRoute,
    public alertController: AlertController,
    public menuCtrl: MenuController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.idUsuario = this.anggota.idUsuario;
      console.log(res);
    });
    this.eventos = [];
    this.start = 0;
  	this.loadEvento();
  }

  ionViewWillEnter(){
    if(this.chave==true){
      this.eventos=[];
    this.presentLoadingWithOptions();
    this.chave=false;
    }
    this.menuCtrl.enable(true);
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.idUsuario = this.anggota.idUsuario;
      console.log(res);
    });
  }  

  loadEvento(){
  	return new Promise(resolve => {
      this.storage.get('session_storage').then((res)=>{
        this.anggota = res;
        this.idUsuario = this.anggota.idUsuario;
        let body = {
          idUsuario: this.idUsuario,
          limit : this.limit,
  			  start : this.start,
          aksi : 'getevento',
        };
  
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for(let evento of data.result){
            this.eventos.push(evento);
          }
          resolve(true);
        });
      });
      });
  	
  }

  loadData(event:any){
    this.start += this.limit;
  	setTimeout(() =>{
  	this.loadEvento().then(()=>{
  		event.target.complete();
  	});
  	}, 500);
  }

  doRefresh(event){
    this.chave=false;
  	setTimeout(() =>{
  		this.ionViewWillEnter();
  		event.target.complete();
  	}, 500);
  }

  pageAdicionarEvento(){
    this.router.navigate(['/adicionar-evento']);
    this.chave=true;
  }


  async delEvento(id){

  	let body = {
  			aksi : 'delEvento',
  			idEvento : id
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
      message: '<strong>Deseja deletar o evento ' + nome + '?</strong>',
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

  perfilEvento(id){
    this.chave=true;
    this.router.navigate(['/perfil-evento/' + id]);
  }

  async pesquisa(){
    if(this.pesquisar==""){
      const toast = await this.toastCtrl.create({
        message: 'A barra de pesquisa está vazia!',
        duration: 2000
      });
      toast.present();
    }
    else{
    this.router.navigate(['/pesquisa/' + this.pesquisar + '/' + this.tipo]);
    this.pesquisar="";
    this.tipo="todos";
    this.chave=true;
    }
  }


  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 2500,
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    this.eventos = [];
    this.start = 0;
  	this.loadEvento();
    return await loading.present();
  }

}
