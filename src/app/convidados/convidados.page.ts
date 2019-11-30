import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-convidados',
  templateUrl: './convidados.page.html',
  styleUrls: ['./convidados.page.scss'],
})
export class ConvidadosPage implements OnInit {

  id_evento: number=0;
  id_convidado: number=0;
  nome_convidado: string = "";
  tipo_convidado: string = "";
  convidados: any = [];
  anggota: any;
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
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      this.id_evento = data.id;
      let body = {
        idEvento: this.id_evento,
        aksi: 'selectConvidados',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if (data.success) {
          this.storage.set('session_storage2', data.result);
              this.storage.get('session_storage2').then((res)=>{
            this.anggota = res;
            this.nome_convidado = this.anggota.Nome;
            this.tipo_convidado = this.anggota.Tipo;
            console.log(res);
          });
        }
      });
    });
  }

  ionViewWillEnter(){
    this.actRoute.params.subscribe((data: any) =>{
      this.id_evento = data.id;
      let body = {
        idEvento: this.id_evento,
        aksi : 'selectConvidados',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_storage2', data.result);
          this.storage.get('session_storage2').then((res)=>{
            this.anggota = res;
            this.nome_convidado = this.anggota.Nome;
            this.tipo_convidado = this.anggota.Tipo;
            console.log(res);
          });
        }
      });
    });
    this.convidados = [];
    this.start = 0;
    this.loadConvidados();
  }

  goToAdicionarConvidados() {
    this.router.navigate(['/adicionar-convidados']);
  }

  loadConvidados() {
    return new Promise(resolve => {
      this.storage.get('session_storage2').then((res) => {
        this.anggota = res;
        this.id_evento = this.anggota.idEvento;
        let body = {
          idEvento: this.id_evento,
          limit: this.limit,
          start: this.start,
          aksi: 'getconvidado',
        };

        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for (let convidado of data.result) {
            this.convidados.push(convidado);
          }
          resolve(true);
        });
      });
    });

  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadConvidados().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  async delConvidado(id) {

    let body = {
      aksi: 'delConvidado',
      idEvento: id
    };

    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {

      var alertpesan = data.msg;
      if (data.success) {
        const toast = await this.toastCtrl.create({
          message: 'Deletado com Sucesso.',
          duration: 2000
        });
        toast.present();
        this.ionViewWillEnter();
      }
      else {
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
      message: '<strong>Deseja deletar o convidado ' + nome + '?</strong>',
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
            this.delConvidado(id);
            console.log('Deletado');
          }
        }
      ]
    });

    await alert.present();
  }
}