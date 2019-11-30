import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora-i',
  templateUrl: './calculadora-i.page.html',
  styleUrls: ['./calculadora-i.page.scss'],
})
export class CalculadoraIPage implements OnInit {

  anggota: any;
  homens: number;
  mulheres: number;
  adolescentes: number;
  criancas: number;
  
  constructor(
    private router: Router,
    private postPvdr: PostProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    private actRoute: ActivatedRoute,
    public alertController: AlertController
 ) { }

  ngOnInit() {
  }

}
