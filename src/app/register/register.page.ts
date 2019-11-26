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
  

  username: string = "";
  password: string = "";
  confirm_password: string = "";
  nome: string = "";
  email: string = "";
  cpf: string = "";
  celular: string = "";
  telefone: string = "";
  celular2: string = "";
  toggle: boolean = false;
  DataNasc: string = "";
  userTipo: number = 0;

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
    if(this.username==""){
        const toast = await this.toastCtrl.create({
          message: 'Login Obrigatório',
          duration: 3000
        });
        toast.present();
    }else if(this.password==""){
        const toast = await this.toastCtrl.create({
          message: 'Senha Obrigatória',
          duration: 3000
        });
        toast.present();
    }else if(this.nome==""){
      const toast = await this.toastCtrl.create({
        message: 'Nome Obrigatório',
        duration: 3000
      });
      toast.present();
    }else if(this.email==""){
      const toast = await this.toastCtrl.create({
        message: 'Email Obrigatório',
        duration: 3000
      });
      toast.present();
    }
    else if(this.cpf==""){
      const toast = await this.toastCtrl.create({
        message: 'CPF Obrigatório',
        duration: 3000
      });
      toast.present();
    }
    else if(this.celular==""){
      const toast = await this.toastCtrl.create({
        message: 'Celular Obrigatório',
        duration: 3000
      });
      toast.present();
    }
    else if(this.password!=this.confirm_password){
        const toast = await this.toastCtrl.create({
          message: 'Senha Inválida',
          duration: 3000
        });
        toast.present();
    }else{
        if(this.toggle==false){
            this.userTipo=1;
        }
        else{
          this.userTipo=2;
        }

      let body = {
        username: this.username,
        password: this.password,
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        celular: this.celular,
        telefone: this.telefone,
        celular2: this.celular2,
        userTipo: this.userTipo,
        DataNasc: this.DataNasc,
        aksi: 'register'
      };

      this.postPvdr.postData(body, 'proses-api.php').subscribe(async data =>{
        var alertpesan = data.msg;
        if(data.success){
          this.router.navigate(['/login']);
          const toast = await this.toastCtrl.create({
            message: 'Registrado com Sucesso',
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
