import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-servico',
  templateUrl: './perfil-servico.page.html',
  styleUrls: ['./perfil-servico.page.scss'],
})
export class PerfilServicoPage implements OnInit {

  idService: number = 0;
  Nome: string = "";
  Tipo: string= "";
  Descricao: string = "";
  /*comentarios: string = "";*/
  anggota: any;

  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.idService = data.id;
      let body = {
        idService: this.idService,
        aksi: 'selectServico',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if (data.success) {
          this.storage.set('session_storage_servico', data.result);
              this.storage.get('session_storage_servico').then((res)=>{
            this.anggota = res;
            this.Nome = this.anggota.Nome;
            this.Tipo = this.anggota.Tipo;
            this.Descricao = this.anggota.Descricao;
            console.log(res);
          });
        }
      });
    });
  }

  ionViewWillEnter(){
    this.actRoute.params.subscribe((data: any) =>{
      this.idService = data.id;
      let body = {
        idService: this.idService,
        aksi : 'selectServico',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_storage_servico', data.result);
          this.storage.get('session_storage_servico').then((res)=>{
            this.anggota = res;
            this.Nome = this.anggota.Nome;
            this.Tipo = this.anggota.Tipo;
            this.Descricao = this.anggota.Descricao;
            console.log(res);
          });
        }
      });
    });
  }

  goToEditarServico() {
    this.router.navigate(['/editar-servico']);
  }

//   async presentActionSheet() {
//     const actionSheet = await this.actionSheetController.create({
//       header: 'Albums',
//       buttons: [{
//         text: 'Delete',
//         role: 'destructive',
//         icon: 'trash',
//         handler: () => {
//           console.log('Delete clicked');
//         }
//       }, {
//         text: 'Share',
//         icon: 'share',
//         handler: () => {
//           console.log('Share clicked');
//         }
//       }, {
//         text: 'Play (open modal)',
//         icon: 'arrow-dropright-circle',
//         handler: () => {
//           console.log('Play clicked');
//         }
//       }, {
//         text: 'Favorite',
//         icon: 'heart',
//         handler: () => {
//           console.log('Favorite clicked');
//         }
//       }, {
//         text: 'Cancel',
//         icon: 'close',
//         role: 'cancel',
//         handler: () => {
//           console.log('Cancel clicked');
//         }
//       }]
//     });
//     await actionSheet.present();
//   }
}