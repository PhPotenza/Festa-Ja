import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-insirir-codigo',
  templateUrl: './insirir-codigo.page.html',
  styleUrls: ['./insirir-codigo.page.scss'],
})
export class InsirirCodigoPage implements OnInit {

  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
  	private storage: Storage,
  	public toastCtrl: ToastController
  ) { }
  ngOnInit() {
  }

  formAlterarSenha(){
  	this.router.navigate(['/alterar-senha']);
  }

}