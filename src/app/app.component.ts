import { Component, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent { 
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Cadastrar Serviços',
      url: '/cadastrar-servico',
      icon: 'briefcase'
    },
    {
      title: 'Perfil',
      url: '/perfil-cliente',
      icon: 'person'
    },
    {
      title: 'Calculadora',
      url: '/calculadora-a',
      icon: 'calculator'
    },
    {
      title: 'Pesquisar Serviço',
      url: '/pesquisar-servico',
      icon: 'search'
    },
    {
      title: 'Perfil Serviço',
      url: '/perfil-servico',
      icon: 'briefcase'
    },
    {
      title: 'Meus Serviços',
      url: '/meus-servicos',
      icon: 'briefcase'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('session_storage').then((res)=>{
      if(res == null){
        this.router.navigate(['/login']);
      }else{
        this.router.navigate(['/home']);
      }
    });
  }


}
