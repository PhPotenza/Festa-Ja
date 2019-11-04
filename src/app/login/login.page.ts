import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import {  MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  username: string = "";
  password: string = "";

  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
  	private storage: Storage,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  async prosesLogin(){
    if(this.username == "" || this.password == ""){
      const toast = await this.toastCtrl.create({
        message: 'Login ou Senha inválidos.',
        duration: 2000
        });
        toast.present();    
    }else{
    let body = {
      username: this.username,
      password: this.password,
      aksi: 'login'
    };
    this.password="";
    this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
      var alertpesan = data.msg;
      if(data.success){
        this.storage.set('session_storage', data.result);
        this.router.navigate(['/home']);
        const toast = await this.toastCtrl.create({
      message: 'Logado com Sucesso.',
      duration: 2000
    });
    toast.present();
        console.log(data);
      }else{
        const toast = await this.toastCtrl.create({
      message: alertpesan,
      duration: 2000
    });
      toast.present();
      }
    });

    }
  }

  formRegister(){
    this.router.navigate(['/register']);
    this.username="";
    this.password="";
  }

  formRecuperarSenha(){
    this.router.navigate(['/recuperar-senha']);
  }
  

}
