import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'cadastrar-servico', loadChildren: './cadastrar-servico/cadastrar-servico.module#CadastrarServicoPageModule' },
  { path: 'perfil-servico', loadChildren: './perfil-servico/perfil-servico.module#PerfilServicoPageModule' },
  { path: 'adicionar-evento', loadChildren: './adicionar-evento/adicionar-evento.module#AdicionarEventoPageModule' },
  { path: 'recuperar-senha', loadChildren: './recuperar-senha/recuperar-senha.module#RecuperarSenhaPageModule' },
  { path: 'insirir-codigo', loadChildren: './insirir-codigo/insirir-codigo.module#InsirirCodigoPageModule' },
  { path: 'alterar-senha', loadChildren: './alterar-senha/alterar-senha.module#AlterarSenhaPageModule' },
  { path: 'perfil-cliente', loadChildren: './perfil-cliente/perfil-cliente.module#PerfilClientePageModule' },
  { path: 'editar-perfil', loadChildren: './editar-perfil/editar-perfil.module#EditarPerfilPageModule' },
  { path: 'buffet', loadChildren: './buffet/buffet.module#BuffetPageModule' },
  { path: 'perfil-evento', loadChildren: './perfil-evento/perfil-evento.module#PerfilEventoPageModule' },
  { path: 'editar-servico', loadChildren: './editar-servico/editar-servico.module#EditarServicoPageModule' },
  { path: 'convidados', loadChildren: './convidados/convidados.module#ConvidadosPageModule' },
  { path: 'adicionar-convidados', loadChildren: './adicionar-convidados/adicionar-convidados.module#AdicionarConvidadosPageModule' },
  { path: 'divulgar-evento', loadChildren: './divulgar-evento/divulgar-evento.module#DivulgarEventoPageModule' },
  { path: 'perfil-evento/:id', loadChildren: './perfil-evento/perfil-evento.module#PerfilEventoPageModule' },
  { path: 'editar-servico', loadChildren: './editar-servico/editar-servico.module#EditarServicoPageModule' },
  { path: 'adicionar-buffet', loadChildren: './adicionar-buffet/adicionar-buffet.module#AdicionarBuffetPageModule' },
  { path: 'calculadora-a', loadChildren: './calculadora-a/calculadora-a.module#CalculadoraAPageModule' },
  { path: 'calculadora-b', loadChildren: './calculadora-b/calculadora-b.module#CalculadoraBPageModule' },
  { path: 'calculadora-c', loadChildren: './calculadora-c/calculadora-c.module#CalculadoraCPageModule' },
  { path: 'calculadora-d', loadChildren: './calculadora-d/calculadora-d.module#CalculadoraDPageModule' },
  { path: 'calculadora-e', loadChildren: './calculadora-e/calculadora-e.module#CalculadoraEPageModule' },
  { path: 'calculadora-f', loadChildren: './calculadora-f/calculadora-f.module#CalculadoraFPageModule' },
  { path: 'calculadora-g', loadChildren: './calculadora-g/calculadora-g.module#CalculadoraGPageModule' },
  { path: 'calculadora-h', loadChildren: './calculadora-h/calculadora-h.module#CalculadoraHPageModule' },
  { path: 'calculadora-i', loadChildren: './calculadora-i/calculadora-i.module#CalculadoraIPageModule' },
  { path: 'contratar-servicos', loadChildren: './contratar-servicos/contratar-servicos.module#ContratarServicosPageModule' },
  { path: 'pesquisar-servico', loadChildren: './pesquisar-servico/pesquisar-servico.module#PesquisarServicoPageModule' },
  { path: 'editar-evento', loadChildren: './editar-evento/editar-evento.module#EditarEventoPageModule' },
  { path: 'lista-servicos', loadChildren: './lista-servicos/lista-servicos.module#ListaServicosPageModule' },  { path: 'meus-servicos', loadChildren: './meus-servicos/meus-servicos.module#MeusServicosPageModule' },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }