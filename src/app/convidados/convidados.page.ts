import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-convidados',
  templateUrl: './convidados.page.html',
  styleUrls: ['./convidados.page.scss'],
})
export class ConvidadosPage implements OnInit {

  idEvento: number;
  total: number;
  anggota: any;
  anggota2: any;
  convidados: any = [];
  totals: any = [];
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
    return new Promise(resolve => {
      this.storage.get('session_storage2').then((res)=>{
        this.anggota = res;
        this.idEvento = this.anggota.idEvento;

        let body2 = {
          idEvento: this.idEvento,
          aksi: 'total',
        }
        this.postPvdr.postData(body2, 'proses-api.php').subscribe(data => {
          if(data.success){
            this.storage.set('session_total', data.result);
            this.storage.get('session_total').then((res)=>{
              this.anggota2 = res;
              this.total = this.anggota2.Total;
            });
          }
        });
        resolve(true);
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
    return new Promise(resolve => {
      this.storage.get('session_storage2').then(async (res)=>{
        this.anggota = res;
        this.idEvento = this.anggota.idEvento;

        let body2 = {
          idEvento: this.idEvento,
          aksi: 'total',
        }
        this.postPvdr.postData(body2, 'proses-api.php').subscribe(data => {
          if(data.success){
            this.storage.set('session_total', data.result);
            this.storage.get('session_total').then((res)=>{
              this.anggota2 = res;
              this.total = this.anggota2.Total;
            });
          }
        });
        this.getConvidado();
        return await loading.present();
        });
      });
    
  }

  getConvidado(){
    return new Promise(resolve => {
      this.storage.get('session_storage2').then((res)=>{
        this.anggota = res;
        this.idEvento = this.anggota.idEvento;
        console.log(res);
      this.convidados = [];
      this.totals = [];
        let body = {
          idEvento: this.idEvento,
          aksi : 'getConvidados',
        };
    
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for(let convidado of data.result){
            this.convidados.push(convidado);
          }
          
      });

      let body2 = {
        idEvento: this.idEvento,
        aksi: 'total',
      }
      this.postPvdr.postData(body2, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_total', data.result);
          this.storage.get('session_total').then((res)=>{
            this.anggota2 = res;
            this.total = this.anggota2.Total;
          });
        }
      });
      resolve(true);
      });
    });
  }

  goToAdicionarConvidados(){
    this.router.navigate(['/adicionar-convidados']);
  }

  formAlterarConvidados(id){
      this.router.navigate(['/alterar-convidados/'+ id]);
  }

  async Situacao(id,situacao){
    if(situacao=="false"){
      let body = {
        id: id,
        situacao: 'true',
        aksi : 'situacaoConvidados',
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        let alertpesan = data.msg;
        console.log(data);
        if(data.success){
          this.getConvidado();
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
        aksi : 'situacaoConvidados',
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        let alertpesan = data.msg;
        console.log(data);
        if(data.success){
          this.getConvidado();
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