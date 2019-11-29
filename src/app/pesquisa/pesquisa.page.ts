import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {

  pesquisar: string = "";
  tipo: string = "";
  servicos: any = [];
  limit: number = 13;
  start: number = 0;


  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
      this.actRoute.params.subscribe((data: any) =>{
        this.tipo = data.tipo;
        this.pesquisar = data.pesquisar;
      });
  }

  ionViewWillEnter(){
    this.actRoute.params.subscribe((data: any) =>{
      this.tipo = data.tipo;
      this.pesquisar = data.pesquisar;
    });
    this.servicos = [];
    this.start = 0;
  	this.loadServico();
  }

  async loadServico(){
  	return new Promise(resolve => {
        let body = {
          limit: this.limit,
          start: this.start,
          filtro: this.tipo,
          pesquisa: this.pesquisar, 
          aksi: 'pesquisarservico'
        };
  
        this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
          if(data.success){
          for(let servico of data.result){
            this.servicos.push(servico);
          }
         
          resolve(true);
        }
        else{
          const toast = await this.toastCtrl.create({
            message: data.msg,
            duration: 2000
          });
          toast.present();
          
        }
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
  this.actRoute.params.subscribe(async (data: any) =>{
    if(this.pesquisar==""){
      const toast = await this.toastCtrl.create({
        message: 'A barra de pesquisa está vazia!',
        duration: 2000
      });
      toast.present();
    }else if(this.pesquisar==data.pesquisar && this.tipo==data.tipo){
      this.router.navigate(['/pesquisa/' + this.pesquisar + '/' + this.tipo]);
    }
    else{
    this.router.navigate(['/pesquisa/' + this.pesquisar + '/' + this.tipo]);
    this.pesquisar="";
    this.tipo="todos";
    }
  });
}

goToPerfilServico(id){
  this.router.navigate(['/perfil-servico/' + id]);
}

}
