import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';
import { Storage } from '@ionic/Storage';


@Component({
  selector: 'app-alterar-buffet',
  templateUrl: './alterar-buffet.page.html',
  styleUrls: ['./alterar-buffet.page.scss'],
})
export class AlterarBuffetPage implements OnInit {

  idBuffet: number;
  anggota: any;
  nome: string = "";
  tipo: string = "";
  unid: string = "";
  quant: number = 0;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) =>{
      this.idBuffet = data.id;
      let body = {
        id: this.idBuffet,
        aksi : 'getBuffet',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_Buffet', data.result);
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
      this.idBuffet = data.id;
      let body = {
        id: this.idBuffet,
        aksi : 'getBuffet',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_Buffet', data.result);
          this.storage.get('session_Buffet').then((res)=>{
            this.anggota = res;
            this.nome = this.anggota.Nome;
            this.tipo = this.anggota.Tipo;
            this.unid = this.anggota.Unidade;
            this.quant = this.anggota.Quantidade;
            console.log(res);
          });
        }
      });
    });
    return await loading.present();
  }

  alterarBuffet(){
    this.actRoute.params.subscribe((data: any) =>{
      this.idBuffet = data.id;
      let body = {
        id: this.idBuffet,
        nome: this.nome,
        tipo: this.tipo,
        quantidade: this.quant,
        unidade: this.unid,
        aksi : 'alterarBuffet',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
        let alertpesan = data.msg;
        if(data.success){
          const toast = await this.toastCtrl.create({
            message: "Alterado com sucesso",
            duration: 3000
          });
          toast.present();
          this.router.navigate(['/buffet']);
       }
       else{
          const toast = await this.toastCtrl.create({
             message: alertpesan,
             duration: 3000
           });
           toast.present();
       }
      });
    });
  }
  
    async delBuffet() {
      const alert = await this.alertController.create({
        header: 'Excluir',
        message: '<strong>Deseja realmente excluir esse item?</strong>',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'light',
          }, {
            text: 'Sim',
            handler: () => {
              this.actRoute.params.subscribe((data: any) =>{
                this.idBuffet = data.id;
                let body = {
                  id: this.idBuffet,
                  aksi : 'delBuffet',
                };
                this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
                  let alertpesan = data.msg;
                  if(data.success){
                    const toast = await this.toastCtrl.create({
                      message: "Excluido com sucesso",
                      duration: 3000
                    });
                    toast.present();
                    this.router.navigate(['/buffet']);
                 }
                 else{
                    const toast = await this.toastCtrl.create({
                       message: alertpesan,
                       duration: 3000
                     });
                     toast.present();
                 }
                });
              });
              
            }
          }
        ]
      });
  
      await alert.present();
    }
  

}
