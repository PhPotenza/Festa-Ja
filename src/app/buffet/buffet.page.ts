import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-buffet',
  templateUrl: './buffet.page.html',
  styleUrls: ['./buffet.page.scss'],
})
export class BuffetPage implements OnInit {

  idListaAlimentos: number;
  idEvento: number;
  Nome: string;
  Tipo: string;
  Quantidade: number;
  Unidade: string;
  anggota: any;
  alimentos: any = [];
  bebidas: any = [];
  doces: any= [];
  outross: any=[];
  cor1: string = "light";
  cor2: string = "light";
  cor3: string = "light";
  cor4: string = "light";


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
  }

  async ionViewWillEnter(){
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 2500,
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    this.getBuffet();
    return await loading.present();
  }

  getBuffet(){
    return new Promise(resolve => {
      this.storage.get('session_storage2').then((res)=>{
        this.anggota = res;
        this.idEvento = this.anggota.idEvento;
        console.log(res);
      this.alimentos = [];
       this.bebidas = [];
       this.doces = [];
       this.outross = [];
        let body = {
          idEvento: this.idEvento,
          filtro: 'alimento',
          aksi : 'selectBuffet',
        };
    
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for(let alimento of data.result){
            this.alimentos.push(alimento);
          }
          
      });
      let body2 = {
        idEvento: this.idEvento,
        filtro: 'bebida',
        aksi : 'selectBuffet',
      };
  
      this.postPvdr.postData(body2, 'proses-api.php').subscribe(data => {
        for(let bebida of data.result){
          this.bebidas.push(bebida);
        }
        
    });
  
    let body3 = {
      idEvento: this.idEvento,
      filtro: 'doce',
      aksi : 'selectBuffet',
    };
  
    this.postPvdr.postData(body3, 'proses-api.php').subscribe(data => {
      for(let doce of data.result){
        this.doces.push(doce);
      }
      
  });
  let body4 = {
    idEvento: this.idEvento,
    filtro: 'outros',
    aksi : 'selectBuffet',
  };
  
  this.postPvdr.postData(body4, 'proses-api.php').subscribe(data => {
    for(let outros of data.result){
      this.outross.push(outros);
    }
    
  });
  //console.log(this.alimentos);
  //console.log(this.outross);
      resolve(true);
      });
    });
  }
  
  /*
  loadBuffet() {
    return new Promise(resolve => {
      this.storage.get('session_storage6').then((res)=>{
        this.anggota = res;
        this.Nome = this.anggota.Nome;
        this.Tipo = this.anggota.Tipo;
        this.Quantidade = this.anggota.Quantidade;
        this.Unidade= this.anggota.Unidade;
        this.idListaAlimentos = this.anggota.idListaAlimentos;
        let body = {
          idUsuario: this.idUsuario,
          aksi : 'selectBuffet',
        };

        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for (let buffet_list of data.result) {
            this.buffet_lists.push(buffet_list);
          }
          resolve(true);
        });
      });
    });
  }
  */
 formAdicionarBuffet(){
    this.router.navigate(['/adicionar-buffet']);
  }

  formAlterarBuffet(id){
      this.router.navigate(['/alterar-buffet/'+ id]);
  }

  async Situacao(id,situacao){
    if(situacao=="false"){
      let body = {
        id: id,
        situacao: 'true',
        aksi : 'situacaoBuffet',
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        let alertpesan = data.msg;
        console.log(data);
        if(data.success){
          this.getBuffet();
      }
        else{
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
        }
      });
    }

    else{
      let body = {
        id: id,
        situacao: 'false',
        aksi : 'situacaoBuffet',
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        let alertpesan = data.msg;
        console.log(data);
        if(data.success){
          this.getBuffet();
      }
        else{
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
        }
      });

    }
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 1250,
      message: 'Carregando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();

  }

}