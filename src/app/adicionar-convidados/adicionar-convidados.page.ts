import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { async } from 'q';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-adicionar-convidados',
  templateUrl: './adicionar-convidados.page.html',
  styleUrls: ['./adicionar-convidados.page.scss'],
})
export class AdicionarConvidadosPage implements OnInit {

  id_evento: number=0;
  nome_convidado: string = "";
  tipo_convidado: string = "";
  anggota: any;

  constructor(
    private router: Router,
    private storage: Storage,
    public toastCtrl: ToastController,
    private postPvdr: PostProvider
  ) { }

  ngOnInit() {
  }

  async adicionarConvidados() {
    return new Promise(resolve => {
      this.storage.get('session_storage2').then(async (res) => {
        this.anggota = res;
        this.id_evento = this.anggota.idEvento;
        if (this.nome_convidado == "") {
          const toast = await this.toastCtrl.create({
            message: 'Nome Obrigatório',
            duration: 3000
          });
          toast.present();
        } else if (this.tipo_convidado == "") {
          const toast = await this.toastCtrl.create({
            message: 'Classificação obrigatória',
            duration: 3000
          });
          toast.present();
        } else {

          let body = {
            id_evento: this.id_evento,
            nome_convidado: this.nome_convidado,
            tipo_convidado: this.tipo_convidado,
            aksi: 'adicionarConvidados'
          };

          this.postPvdr.postData(body, 'proses-api.php').subscribe(async data => {
            var alertpesan = data.msg;
            if (data.success) {
              this.router.navigate(['/convidados']);
              const toast = await this.toastCtrl.create({
                message: 'Adicionado com Sucesso',
                duration: 3000
              });
              toast.present();
              this.nome_convidado = "";
              this.tipo_convidado = "";
            } else {
              const toast = await this.toastCtrl.create({
                message: alertpesan,
                duration: 3000
              });
              toast.present();
            }
          });
        }
      });
    });
  }
}