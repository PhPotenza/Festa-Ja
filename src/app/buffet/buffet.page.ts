import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
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
      this.idEvento = data.id;
      let body = {
        idEvento: this.idEvento,
        aksi : 'selectBuffet',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_storage3', data.result);
        }
      });
    });
  }

  ionViewWillEnter(){
    this.actRoute.params.subscribe((data: any) =>{
      this.idEvento = data.id;
      let body = {
        idEvento: this.idEvento,
        aksi : 'selectBuffet',
      };
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        if(data.success){
          this.storage.set('session_storage3', data.result);
          this.storage.get('session_storage3').then((res)=>{
            this.anggota = res;
            this.Nome = this.anggota.Nome;
            this.Tipo = this.anggota.Tipo;
            this.Quantidade = this.anggota.Quantidade;
            this.Unidade= this.anggota.Unidade;
            this.idListaAlimentos = this.anggota.idListaAlimentos;
            console.log(res);
          });
        }
      });
    });
  }

 formAdicionarBuffet(){
    this.router.navigate(['/adicionar-buffet']);
  }

}