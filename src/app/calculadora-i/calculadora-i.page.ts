import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { AlertController } from '@ionic/angular';
import { NavController, NavParams } from '@ionic/angular';
import { MbscFormOptions } from '@mobiscroll/angular';


@Component({
  selector: 'app-calculadora-i',
  templateUrl: './calculadora-i.page.html',
  styleUrls: ['./calculadora-i.page.scss'],
})
export class CalculadoraIPage implements OnInit {


  anggota: any;

  //dados
  homens: number=0;
  mulheres: number=0;
  adolescentes: number=0;
  criancas: number=0;
  horas: number=0;
  dados: any;
  qtde_adultos: number=0;
  qtde_pessoas: number=0;

  //festas
  item_festas: number=0;
  qtde_salgados: number;
  coxinha: boolean=false;
  bolinha_queijo: boolean=false;
  quibe: boolean=false;
  croquete: boolean=false;
  enroladinho_salsicha: boolean=false;
  enroladinho_pq: boolean=false;
  pao_queijo: boolean=false;
  risole_pq: boolean=false;
  risole_camarao: boolean=false;
  pastel: boolean=false;
  empadinha: boolean=false;
  nuggets: boolean=false;
  croissant: boolean=false;
  trouxinha: boolean=false;
  esfiha: boolean=false;
  pizza: boolean=false;
  festas: any;

  //churras
  item_churrasco: number=0;
  qtde_carne: number=0;
  alcatra: boolean=false;
  maminha: boolean=false;
  picanha: boolean=false;
  contrafile: boolean=false;
  fraldinha: boolean=false;
  pernil: boolean=false;
  picanha_suina: boolean=false;
  lombo: boolean=false;
  costelinha: boolean=false;
  panceta: boolean=false;
  coxinha_asa: boolean=false;
  asinha: boolean=false;
  coracao: boolean=false;
  salsichao: boolean=false;
  linguica_toscana: boolean=false;
  pao_alho: boolean=false;
  churrasco: any;

  //porcoes
  item_porcoes: number=0;
  mandioca_frita: boolean=false;
  batata_frita: boolean=false;
  amendoim: boolean=false;
  torresmo: boolean=false;
  linguica_acebolada: boolean=false;
  bolinho_arroz: boolean=false;
  frango_passarinho: boolean=false;
  medalahao_frango: boolean=false;
  polenta_frita: boolean=false;
  bolinho_bacalhau: boolean=false;
  espetinho: boolean=false;
  tilapia_frita: boolean=false;
  batata_rustica: boolean=false;
  iscas_file: boolean=false;
  azeitona_temperada: boolean=false;
  tabua_frios: boolean=false;
  porcoes: any;

  //bebidas
  cerveja: boolean=false;
  refrigerante: boolean=false;
  suco: boolean=false;
  agua: boolean=false;
  bebidas: any;

  //doces
  item_doces: number;
  qtde_doces: number=0;
  brigadeiro: boolean=false;
  beijinho: boolean=false;
  bicho_pe: boolean=false;
  brigadeiro_colher: boolean=false;
  bolo: boolean=false;
  torta: boolean=false;
  palha_italiana: boolean=false;
  quindim: boolean=false;
  petit_gateau: boolean=false;
  cupcake: boolean=false;
  maca_amor: boolean=false;
  doces: any;

  //descartaveis
  qtde_copos: number=0;
  qtde_pratos_talheres: number=0;
  qtde_guardanapos: number=0;
  pratos: boolean=false;
  copos: boolean=false;
  talheres: boolean=false;
  guardanapos: boolean=false;
  suprimentos: any;
  
  
  constructor(
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController
 ) { }

  ngOnInit() {

    this.storage.get('session_dados').then((dados)=>{
      this.anggota = dados;
      this.homens = this.anggota.homens;
      this.mulheres = this.anggota.mulheres;
      this.adolescentes = this.anggota.adolescentes;
      this.criancas = this.anggota.criancas;
      console.log(dados);
    });

    this.storage.get('session_item_festas').then((ifestas)=>{
      this.anggota = ifestas;
      this.item_festas = this.anggota.item_festas;
      console.log(ifestas);
    });

    this.storage.get('session_festas').then((festas)=>{
      this.anggota = festas;
      this.coxinha = this.anggota.coxinha;
      this.bolinha_queijo = this.anggota.bolinha_queijo;
      this.quibe = this.anggota.quibe;
      this.croquete = this.anggota.croquete;
      this.enroladinho_salsicha = this.anggota.enroladinho_salsicha;
      this.enroladinho_pq = this.anggota.enroladinho_pq;
      this.pao_queijo = this.anggota.pao_queijo;
      this.risole_pq = this.anggota.risole_pq;
      this.risole_camarao = this.anggota.risole_camarao;
      this.pastel = this.anggota.pastel;
      this.empadinha = this.anggota.empadinha;
      this.nuggets = this.anggota.nuggets;
      this.croissant = this.anggota.croissant;
      this.trouxinha = this.anggota.trouxinha;
      this.esfiha = this.anggota.esfiha;
      this.pizza = this.anggota.pizza;
      console.log(festas);
    });

    this.storage.get('session_item_churrasco').then((ichurrasco)=>{
      this.anggota = ichurrasco;
      this.item_churrasco = this.anggota.item_churrasco;
      console.log(ichurrasco);
    });

    this.storage.get('session_churrasco').then((churrasco)=>{
      this.anggota = churrasco;
      this.alcatra = this.anggota.alcatra;
      this.maminha = this.anggota.maminha;
      this.picanha = this.anggota.picanha;
      this.contrafile = this.anggota.contrafile;
      this.fraldinha = this.anggota.fraldinha;
      this.pernil = this.anggota.pernil;
      this.picanha_suina = this.anggota.picanha_suina;
      this.lombo = this.anggota.lombo;
      this.costelinha = this.anggota.costelinha;
      this.panceta = this.anggota.panceta;
      this.coxinha_asa = this.anggota.coxinha_asa;
      this.asinha = this.anggota.asinha;
      this.coracao = this.anggota.coracao;
      this.salsichao = this.anggota.salsichao;
      this.linguica_toscana = this.anggota.linguica_toscana;
      this.pao_alho = this.anggota.pao_alho;
      console.log(churrasco);
    });

    this.storage.get('session_item_porcoes').then((iporcoes)=>{
      this.anggota = iporcoes;
      this.item_porcoes = this.anggota.item_porcoes;
      console.log(iporcoes);
    });

    this.storage.get('session_porcoes').then((porcoes)=>{
      this.anggota = porcoes;
      this.mandioca_frita = this.anggota.mandioca_frita;
      this.batata_frita = this.anggota.batata_frita;
      this.amendoim = this.anggota.amendoim;
      this.torresmo = this.anggota.torresmo;
      this.linguica_acebolada = this.anggota.linguica_acebolada;
      this.bolinho_arroz = this.anggota.bolinho_arroz;
      this.frango_passarinho = this.anggota.frango_passarinho;
      this.medalahao_frango = this.anggota.medalahao_frango;
      this.polenta_frita = this.anggota.polenta_frita;
      this.bolinho_bacalhau = this.anggota.bolinho_bacalhau;
      this.espetinho = this.anggota.espetinho;
      this.tilapia_frita = this.anggota.tilapia_frita;
      this.batata_rustica = this.anggota.batata_rustica;
      this.iscas_file = this.anggota.iscas_file;
      this.azeitona_temperada = this.anggota.azeitona_temperada;
      this.tabua_frios = this.anggota.tabua_frios;
      console.log(porcoes);
    });

    this.storage.get('session_bebidas').then((bebidas)=>{
      this.anggota = bebidas;
      this.cerveja = this.anggota.cerveja;
      this.refrigerante = this.anggota.refrigerante;
      this.suco = this.anggota.suco;
      this.agua = this.anggota.agua;
      console.log(bebidas);
    });

    this.storage.get('session_item_doces').then((idoces)=>{
      this.anggota = idoces;
      this.item_doces = this.anggota.item_doces;
      console.log(idoces);
    });

    this.storage.get('session_doces').then((doces)=>{
      this.anggota = doces;
      this.brigadeiro = this.anggota.brigadeiro;
      this.beijinho = this.anggota.beijinho;
      this.bicho_pe = this.anggota.bicho_pe;
      this.brigadeiro_colher = this.anggota.brigadeiro_colher;
      this.bolo = this.anggota.bolo;
      this.torta = this.anggota.torta;
      this.palha_italiana = this.anggota.palha_italiana;
      this.quindim = this.anggota.quindim;
      this.petit_gateau = this.anggota.petit_gateau;
      this.cupcake = this.anggota.cupcake;
      this.maca_amor = this.anggota.maca_amor;
      console.log(doces);
    });

    this.storage.get('session_suprimentos').then((suprimentos)=>{
      this.anggota = suprimentos;
      this.pratos = this.anggota.pratos;
      this.copos = this.anggota.copos;
      this.talheres = this.anggota.talheres;
      this.guardanapos = this.anggota.guardanapos;
      console.log(suprimentos);
    });   
  }

  calcPessoas(){
    this.qtde_adultos = this.homens + this.mulheres;
    this.qtde_pessoas = this.qtde_adultos + this.adolescentes + this.criancas;
  }

  calcFestas(){
    
  }

  calcSuprimentos(){
    this.qtde_guardanapos = this.qtde_pessoas * 7;
    this.qtde_copos = this.qtde_pessoas * 5;
    if(((this.item_churrasco > 0) || (this.item_festas > 0) || (this.item_porcoes > 0)) && this.item_doces > 0){
      this.qtde_pratos_talheres = (this.qtde_pessoas + (this.qtde_pessoas * 0,2)) * 2;
    } else {
      this.qtde_pratos_talheres = this.qtde_pessoas + (this.qtde_pessoas * 0,2);
    }
  }
}