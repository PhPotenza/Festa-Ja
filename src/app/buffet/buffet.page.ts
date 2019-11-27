import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-buffet',
  templateUrl: './buffet.page.html',
  styleUrls: ['./buffet.page.scss'],
})
export class BuffetPage implements OnInit {

  idEvento: number;
  anggota: any;
  alimentos: any = [];

  constructor(
  	private router: Router,
  	private postPvdr: PostProvider,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public toastCtrl: ToastController,
    public alertController: AlertController,
  ) { }
  ngOnInit() {
    return new Promise(resolve => {
    this.storage.get('session_storage2').then((res)=>{
      this.anggota = res;
      this.idEvento = this.anggota.idEvento;
      console.log(res);
      let body = {
        idEvento: this.idEvento,
        aksi : 'selectBuffet',
      };
  
      this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {
        for(let alimento of data.result){
          this.alimentos.push(alimento);
        }
        resolve(true);
    });
    
    });
  });
  }

  ionViewWillEnter(){
 
  }

 formAdicionarBuffet(){
    this.router.navigate(['/adicionar-buffet']);
  }

}