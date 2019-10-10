import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-lista-servicos',
  templateUrl: './lista-servicos.page.html',
  styleUrls: ['./lista-servicos.page.scss'],
})
export class ListaServicosPage implements OnInit {

  idUsuario: number=0;
  nome_servico: string = "";
  tipo_servico: string = "";
  anggota: any;
  servicos: any = [];
  limit: number = 13;
  start: number = 0;

  constructor (
      private router: Router,
      private storage: Storage,
      public toastCtrl: ToastController,
      private postPvdr: PostProvider,
  ){}

  ngOnInit() {
  }


  loadServicos(){
  	return new Promise(resolve => {
      this.storage.get('session_storage').then((res)=>{
        this.anggota = res;
        this.idUsuario = this.anggota.idUsuario;
        let body = {
          idUsuario: this.idUsuario,
          limit : this.limit, //erro
  			  start : this.start, //erro
          aksi : 'getevento',
        };

        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
          for(let servico of data.result){
            this.servicos.push(servico);
            //erro aqui. ~Potz 
          }
          resolve(true);
        });
      });
      });

  }

}