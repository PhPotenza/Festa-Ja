import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },  { path: 'cadastrar-servico', loadChildren: './cadastrar-servico/cadastrar-servico.module#CadastrarServicoPageModule' },
  { path: 'perfil-servico', loadChildren: './perfil-servico/perfil-servico.module#PerfilServicoPageModule' },
  { path: 'recuperar-senha', loadChildren: './recuperar-senha/recuperar-senha.module#RecuperarSenhaPageModule' },
  { path: 'insirir-codigo', loadChildren: './insirir-codigo/insirir-codigo.module#InsirirCodigoPageModule' },
  { path: 'alterar-senha', loadChildren: './alterar-senha/alterar-senha.module#AlterarSenhaPageModule' },
  { path: 'perfil-cliente', loadChildren: './perfil-cliente/perfil-cliente.module#PerfilClientePageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
