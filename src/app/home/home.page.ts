import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  anggota: any;
  eventos: any = [];
  idUsuario: number;
  limit: number = 13;
  start: number = 0;

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;
      this.idUsuario = this.anggota.idUsuario;
      console.log(res);
    });
    this.eventos = [];
    this.start = 0;
  	this.loadEvento();
  }

  async prosesLogout(){
    this.storage.clear();
    this.router.navigate(['/login']);
    const toast = await this.toastCtrl.create({
        message: 'Deslogado com Sucesso',
        duration: 3000
      });
    toast.present();
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
  	setTimeout(() =>{
  		this.ionViewWillEnter();
  		event.target.complete();
  	}, 500);
  }

  pageAdicionarEvento(){
  	this.router.navigate(['/adicionar-evento']);
  }

  pagePerfilEvento(){
  	this.router.navigate(['/perfil-evento']);
  }

}
