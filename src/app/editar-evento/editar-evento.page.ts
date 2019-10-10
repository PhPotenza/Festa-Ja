import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.page.html',
  styleUrls: ['./editar-evento.page.scss'],
})
export class EditarEventoPage implements OnInit {

  idEvento: number;
  NomeEvento: string;
  TipoEvento: string;
  CEP: string;
  Cidade: string;
  Estado: string;
  Bairro: string;
  Endereco: string;
  Numero: number;
  Complemento: string;
  date1: string;
  time1: string;
  anggota: any;

  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private actRoute: ActivatedRoute,
    private storage: Storage,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage2').then((res)=>{
      this.anggota = res;
      this.NomeEvento = this.anggota.NomeEvento;
      this.TipoEvento = this.anggota.Tipo;
      this.CEP = this.anggota.CEP;
      this.Estado = this.anggota.Estado;
      this.Cidade = this.anggota.Cidade;
      this.Endereco = this.anggota.Endereco;
      this.Bairro = this.anggota.Bairro;
      this.Numero = this.anggota.Numero;
      this.Complemento = this.anggota.Complemento;
      this.date1 = this.anggota.Data_Inicio;
      this.time1 = this.anggota.Hora_Inicio;
    });
  }
}