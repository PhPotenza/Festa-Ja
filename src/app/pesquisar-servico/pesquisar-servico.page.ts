import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-pesquisar-servico',
  templateUrl: './pesquisar-servico.page.html',
  styleUrls: ['./pesquisar-servico.page.scss'],
})
export class PesquisarServicoPage implements OnInit {

  servicos: any = [];
  limit: number = 13;
  start: number = 0;
  pesquisar: string = "";
  tipo: string = "todos";

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private actRoute: ActivatedRoute,
    public alertController: AlertController,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true);
 
    this.servicos = [];
    this.start = 0;
  	this.loadServico();
  }

  loadServico(){
  	return new Promise(resolve => {
        let body = {
          limit: this.limit,
  			  start: this.start,
          aksi: 'getdestaque'
        };
  
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for(let servico of data.result){
            this.servicos.push(servico);
          }
          resolve(true);
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
    }
  }
}
