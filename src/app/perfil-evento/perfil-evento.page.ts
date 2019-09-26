import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'app-perfil-evento',
  templateUrl: './perfil-evento.page.html',
  styleUrls: ['./perfil-evento.page.scss'],
})
export class PerfilEventoPage implements OnInit {

  idEvento: number;
  NomeEvento: string;
  Tipo: string;
  anggota: any;
  constructor(
    private router: Router,
  	private postPvdr: PostProvider,
    private actRoute: ActivatedRoute,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) =>{
      this.idEvento = data.id;
      this.NomeEvento = data.nome;
      this.Tipo = data.tipo;
      console.log(data);
      this.selectEvento();
  	});
  }

  selectEvento(){
        let body = {
          idEvento: this.idEvento,
          aksi : 'selectEvento',
        };
        this.postPvdr.postData(body, 'proses-api.php').subscribe(data => {

        });
      
  }

}
