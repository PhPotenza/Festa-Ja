import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-meus-servicos',
  templateUrl: './meus-servicos.page.html',
  styleUrls: ['./meus-servicos.page.scss'],
})
export class MeusServicosPage implements OnInit {

  id_servico: number=0;
  anggota: any;
  servicos: any = [];
  limit: number = 13;
  start: number = 0;

  constructor(
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage3').then((res)=>{
      this.anggota = res;
      this.id_servico = this.anggota.idService;
      console.log(res);
    });
    this.servicos = [];
    this.start = 0;
  	this.loadServico();
  } 

  loadServico() {
    return new Promise(resolve => {
      this.storage.get('session_storage3').then((res) => {
        this.anggota = res;
        this.id_servico = this.anggota.idUsuario;
        let body = {
          idService: this.id_servico,
          limit: this.limit,
          start: this.start,
          aksi: 'getservico',
        };

        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for (let servico of data.result) {
            this.servicos.push(servico);
          }
          resolve(true);
        });
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

  goToPerfilServico(id){
  	this.router.navigate(['/perfil-servico/' + id]);
  }

  goToCadastrarServicos(){
    this.router.navigate(['/cadastrar-servicos/']);
  }

}
