import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  login: string;
  senha: string;

  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
  	private storage: Storage,
  	public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async prosesLogin(){
    if(this.login != "" && this.login != ""){
      let body = {
        login: this.login,
        senha: this.senha,
        aksi: 'login'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.storage.set('session_storage', data.result);
          this.router.navigate(['/customer']);
          const toast = await this.toastCtrl.create({
		    message: 'Logado com Sucesso',
		  	duration: 2000
		  });
		  toast.present();
		  this.login = "";
		  this.senha = "";
          console.log(data);
        }else{
          const toast = await this.toastCtrl.create({
		    message: alertpesan,
		    duration: 2000
		  });
    	  toast.present();
        }
      });

    }else{
      const toast = await this.toastCtrl.create({
		message: 'Login ou Senha Incorretos',
		duration: 2000
	  });
	  toast.present();
    }
  }

  formRegister(){
  	this.router.navigate(['/register']);
  }

}
