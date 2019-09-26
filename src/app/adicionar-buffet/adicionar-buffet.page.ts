import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-adicionar-buffet',
  templateUrl: './adicionar-buffet.page.html',
  styleUrls: ['./adicionar-buffet.page.scss'],
})
export class AdicionarBuffetPage implements OnInit {

  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
  	private storage: Storage,
  	public toastCtrl: ToastController
  ) { }
  ngOnInit() {
  }

 formBuffet(){
    this.router.navigate(['/buffet']);
  }

}