import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  login: string = "";
  senha: string = "";
  confirma_senha: string = "";
  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
  	private storage: Storage,
  	public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async prosesRegister(){
    // validation done
    if(this.login==""){
        const toast = await this.toastCtrl.create({
          message: 'Login é obrigatrório',
          duration: 3000
        });
        toast.present();
    }else if(this.senha==""){
        const toast = await this.toastCtrl.create({
          message: 'Senha é obrigatória',
          duration: 3000
        });
        toast.present();
    }else if(this.senha!=this.confirma_senha){
        const toast = await this.toastCtrl.create({
          message: 'Senha Inválida',
          duration: 3000
        });
        toast.present();
    }else{

      let body = {
        login: this.login,
        senha: this.senha,
        aksi: 'register'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/login']);
          const toast = await this.toastCtrl.create({
            message: 'Registrado com sucesso',
            duration: 3000
          });
          toast.present();
        }else{
          const toast = await this.toastCtrl.create({
            message: alertpesan,
            duration: 3000
          });
          toast.present();
        }
      });

    }
  
  }

  formLogin(){
  	this.router.navigate(['/login']);
  }

}
