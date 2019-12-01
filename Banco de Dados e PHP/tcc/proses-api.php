<?php

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
  header('Content-Type: text/html; charset=iso-8859-1');

  include "biblioteca/config.php";

  $postjson = json_decode(file_get_contents('php://input'), true);
  $today    = date('Y-m-d');

//Método Login
  if($postjson['aksi']=="login"){
    $password = md5($postjson['password']);
    $query = mysqli_query($mysqli, "SELECT * FROM usuario WHERE (login='$postjson[username]' AND senha='$password') OR (email='$postjson[username]' AND senha='$password')");
    $check = mysqli_num_rows($query);

    if($check>0){
      $data = mysqli_fetch_array($query);
      $datauser = array(
        'idUsuario' => $data['idUsuario'],
        'Login' => $data['Login'],
        'Senha' => $data['Senha'],
        'Nome' => $data['Nome'],
        'Email' => $data ['Email'],
        'idTipo' => $data['idTipo'],
        'CPF' => $data['CPF'],
        'Celular' => $data['Celular'],
        'Telefone' => $data['Telefone'],
        'SecunContat'=> $data['SecunContat']
      );

      if($data['Status']=='y'){
        $result = json_encode(array('success'=>true, 'result'=>$datauser));
      }else{
        $result = json_encode(array('success'=>false, 'msg'=>'Usuário Inativo'));
      }

    }else{
      $result = json_encode(array('success'=>false, 'msg'=>'Usuário não Cadastrado'));
    }

    echo $result;
  }

//método registrar
  elseif($postjson['aksi']=="register"){
    $password = md5($postjson['password']);
    //select para não permitir usuários iguais
    $query = mysqli_query($mysqli, "SELECT * FROM usuario WHERE login='$postjson[username]' OR email='$postjson[email]' OR cpf='$postjson[cpf]'");
    $check = mysqli_num_rows($query);

    if($check==0){
    $password = md5($postjson['password']);
    //Insert para inserir usuários no DB
    $query = mysqli_query($mysqli, "INSERT INTO usuario SET
      Login = '$postjson[username]',
      Senha = '$password',
      idTipo = '$postjson[userTipo]',
      nome = '$postjson[nome]',
      email = '$postjson[email]',
      cpf =  '$postjson[cpf]',
      celular =  '$postjson[celular]',
      telefone =  '$postjson[telefone]',
      SecunContat =  '$postjson[celular2]',
      DataNasc = '$postjson[DataNasc]',
      Status   = 'y',
      FirstTime = 'y'
    ");

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Erro! Por favor tente novamente'));
  }
    else {
      $result = json_encode(array('success'=>false, 'msg'=>'Usuário já Cadastrado'));
    }

    echo $result;
  }

//método de selecionar evento para o home
  elseif($postjson['aksi']=='getevento'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT *, year(Data_Inicio), month(Data_Inicio), day(Data_Inicio), minute(Hora_Inicio), hour(Hora_Inicio),
    year(Data_Fim), month(Data_Fim), day(Data_Fim), minute(Hora_Fim), hour(Hora_Fim)
     FROM evento where idUsuario='$postjson[idUsuario]' ORDER BY idEvento DESC LIMIT $postjson[start],$postjson[limit]");

    while($row = mysqli_fetch_array($query)){

      $data[] = array(
        'idEvento' => $row['idEvento'],
        'NomeEvento' => $row['NomeEvento'],
        'TipoEvento' => $row['Tipo'],
        'CEP' => $row['CEP'],
        'year1' => $row['year(Data_Inicio)'],
        'day1' => $row['day(Data_Inicio)'],
        'month1' =>$row['month(Data_Inicio)'],
        'minute1' => $row['minute(Hora_Inicio)'],
        'hour1' => $row['hour(Hora_Inicio)'],
        'Data_Fim' => $row['Data_Fim'],
        'Hora_Fim' => $row['Hora_Fim'],
        'year2' => $row['year(Data_Fim)'],
        'day2' => $row['day(Data_Fim)'],
        'month2' => $row['month(Data_Fim)'],
        'minute2' => $row['minute(Hora_Fim)'],
        'hour2' => $row['hour(Hora_Fim)'],
      );
    }

    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false));

    echo $result;

  }

//método para adicionar evento
  elseif($postjson['aksi']=='addEvento'){
    $query = mysqli_query($mysqli, "INSERT INTO evento SET
      NomeEvento = '$postjson[nome]',
      Tipo = '$postjson[tipo]',
      CEP = '$postjson[cep]',
      Estado = '$postjson[estado]',
      idUsuario = '$postjson[IdUsuario]',
      Bairro = '$postjson[bairro]',
      Cidade = '$postjson[cidade]',
      Endereco = '$postjson[endereco]',
      Numero = '$postjson[numero]',
      Complemento = '$postjson[complemento]',
      Data_Inicio = '$postjson[date1]',
      Hora_Inicio = '$postjson[time1]',
      Data_Fim = '$postjson[date2]',
      Hora_Fim = '$postjson[time2]'
    ");

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Erro! Por favor tente novamente'));

    echo $result;

  }

//método para deletar evento
  elseif($postjson['aksi']=='delEvento'){
    $query = mysqli_query($mysqli, "DELETE FROM listaalimentos WHERE idEvento='$postjson[idEvento]'");
    $query = mysqli_query($mysqli, "DELETE FROM listaconvidados WHERE idEvento='$postjson[idEvento]'");
    $query = mysqli_query($mysqli, "DELETE FROM evento WHERE idEvento='$postjson[idEvento]'");

    if($query) $result = json_encode(array('success'=>true, 'result'=>'success', 'msg'=>'Deletado com sucesso'));
    else $result = json_encode(array('success'=>false, 'result'=>'error', 'msg'=>'Erro ao deletar'));

    echo $result;


  }

  elseif($postjson['aksi']=='selectEvento'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT *, year(Data_Inicio), month(Data_Inicio), day(Data_Inicio), minute(Hora_Inicio), hour(Hora_Inicio),
    year(Data_Fim), month(Data_Fim), day(Data_Fim), minute(Hora_Fim), hour(Hora_Fim)
     FROM evento where idEvento='$postjson[idEvento]'");

    $data = mysqli_fetch_array($query);
    $datauser = array(
      'idEvento' => $data['idEvento'],
      'NomeEvento' => $data['NomeEvento'],
      'Tipo' => $data['Tipo'],
      'CEP' => $data['CEP'],
      'Estado' => $data['Estado'],
      'Bairro' => $data['Bairro'],
      'Cidade' => $data['Cidade'],
      'Endereco' => $data['Endereco'],
      'Numero' => $data['Numero'],
      'Complemento' => $data['Complemento'],
      'Data_Inicio' => $data['Data_Inicio'],
      'Hora_Inicio' => $data['Hora_Inicio'],
      'year1' => $data['year(Data_Inicio)'],
      'day1' => $data['day(Data_Inicio)'],
      'month1' => $data['month(Data_Inicio)'],
      'minute1' => $data['minute(Hora_Inicio)'],
      'hour1' => $data['hour(Hora_Inicio)'],
      'Data_Fim' => $data['Data_Fim'],
      'Hora_Fim' => $data['Hora_Fim'],
      'year2' => $data['year(Data_Fim)'],
      'day2' => $data['day(Data_Fim)'],
      'month2' => $data['month(Data_Fim)'],
      'minute2' => $data['minute(Hora_Fim)'],
      'hour2' => $data['hour(Hora_Fim)'],
    );
    $result = json_encode(array('success'=>true, 'result'=>$datauser));
    echo $result;
  }

    //Update do perfil cliente (editar perfil)
    elseif($postjson['aksi']=='updatePerfil'){
      $query = mysqli_query($mysqli, "UPDATE usuario SET
        CPF =  '$postjson[cpf]',
        Celular =  '$postjson[celular]',
        Telefone =  '$postjson[telefone]',
        SecunContat =  '$postjson[contato_secundario]' WHERE idUsuario='$postjson[idUsuario]'");

      $query = mysqli_query($mysqli, "SELECT * FROM usuario WHERE idUsuario='$postjson[idUsuario]'");
      $check = mysqli_num_rows($query);
    if($check>0){
      $data = mysqli_fetch_array($query);
      $datauser = array(
        'idUsuario' => $data['idUsuario'],
        'Login' => $data['Login'],
        'Nome' => $data['Nome'],
        'Email' => $data ['Email'],
        'CPF' => $data['CPF'],
        'Celular' => $data['Celular'],
        'Telefone' => $data['Telefone'],
        'SecunContat'=> $data['SecunContat']
      );

        $result = json_encode(array('success'=>true, 'result'=>$datauser));
    }else{
      $result = json_encode(array('success'=>false, 'msg'=>'Erro ao alterar informações'));
    }

    echo $result;
    }

    //Update do Evento
    elseif($postjson['aksi']=='updateEvento'){
      $query = mysqli_query($mysqli, "UPDATE Evento SET
        NomeEvento = '$postjson[nome]',
        Tipo = '$postjson[tipo]',
        CEP = '$postjson[cep]',
        Estado = '$postjson[estado]',
        Bairro = '$postjson[bairro]',
        Cidade = '$postjson[cidade]',
        Endereco = '$postjson[endereco]',
        Numero = '$postjson[numero]',
        Complemento = '$postjson[complemento]',
        Data_Inicio = '$postjson[date1]',
        Hora_Inicio = '$postjson[time1]',
        Data_Fim = '$postjson[date2]',
        Hora_Fim = '$postjson[time2]' WHERE idEvento='$postjson[idEvento]'");

      if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
      else $result = json_encode(array('success'=>false, 'result'=>'error'));

      echo $result;

    }

    //PESQUISAR SERVICOS
    elseif($postjson['aksi']=='pesquisarservico'){
      $data = array();
      $pesquisa = $postjson['pesquisa'];
      $filtro = $postjson['filtro'];
      if($filtro == "todos"){
        $query = mysqli_query($mysqli, "SELECT * FROM service where Nome like '%$pesquisa%' or
           Descricao like '%$pesquisa%' ORDER BY idService LIMIT $postjson[start],$postjson[limit] ");
        $check = mysqli_num_rows($query);


      }
      else{
      $query = mysqli_query($mysqli, "SELECT * FROM service where (Tipo='$filtro' and Nome like '%$pesquisa%')
       or (Tipo='$filtro' and Descricao like '%$pesquisa%') ORDER BY idService LIMIT $postjson[start],$postjson[limit] ");
      $check = mysqli_num_rows($query);

    }
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'idService' => $row['idService'],
        'Nome' => $row['Nome'],
        'Tipo' => $row['Tipo'],
        'Descricao' => $row['Descricao'],
      );
    }

    if($check>0){
    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false));
    }
    else{
      $result = json_encode(array('sucess'=>false, 'msg'=>'Nenhum serviço encontrado'));
    }

    echo $result;

    }


    //método para cadastrar servico
    elseif($postjson['aksi']=='cadastrarServico'){
      $query = mysqli_query($mysqli, "INSERT INTO service SET
        idUsuario = '$postjson[IdUsuario]',
        Nome = '$postjson[nome]',
        Descricao = '$postjson[descricao]',
        Tipo = '$postjson[tipo]',
        Estado = '$postjson[estado]',
        Cidade = '$postjson[cidade]',
        Celular = '$postjson[celular]',
        Telefone = '$postjson[telefone]'
      ");

      if($query) $result = json_encode(array('success'=>true));
      else $result = json_encode(array('success'=>false, 'msg'=>'Erro! Por favor tente novamente'));

      echo $result;
    }

    //metodo alterar serviço
    elseif($postjson['aksi']=='updateServico'){
      $query = mysqli_query($mysqli, "UPDATE servico SET
        Nome = '$postjson[nome_servico]',
        Descricao = '$postjson[descricao_servico]',
        Tipo =  '$postjson[tipo_servico]' WHERE idService='$postjson[id_servico]'");

      if($query) $result = json_encode(array('success'=>true, 'msg'=>'Atualizado com sucesso'));
      else $result = json_encode(array('success'=>false, 'msg'=>'Erro! Por favor tente novamente'));

      echo $result;
    }

    //método para alterar a situação do Buffet
    elseif($postjson['aksi']=='situacaoBuffet'){
      $query = mysqli_query($mysqli, "UPDATE listaalimentos SET
        Situacao = '$postjson[situacao]' WHERE idListaAlimentos='$postjson[id]'
      ");
      if($query) $result = json_encode(array('success' => true));
      else $result = json_encode(array('success'=>false, 'msg'=>'Erro!'));
      echo $result;
    }

    //método para alterar Buffet
    elseif($postjson['aksi']=='alterarBuffet'){
      $query = mysqli_query($mysqli, "UPDATE listaalimentos SET
        Nome = '$postjson[nome]',
        Tipo= '$postjson[tipo]',
        Quantidade = '$postjson[quantidade]',
        Unidade = '$postjson[unidade]' WHERE idListaAlimentos='$postjson[id]'
      ");
      if($query) $result = json_encode(array('success' => true));
      else $result = json_encode(array('success'=>false, 'msg'=>'Erro!'));
      echo $result;
    }


    //método getBuffet
    elseif($postjson['aksi']=='getBuffet'){
      $data = array();
      $query = mysqli_query($mysqli, "SELECT * FROM listaalimentos where idListaAlimentos='$postjson[id]'");

      $data = mysqli_fetch_array($query);
      $datauser = array(
        'idEvento' => $data['idEvento'],
        'Nome' => $data['Nome'],
        'Tipo' => $data['Tipo'],
        'Quantidade' => $data['Quantidade'],
        'Unidade' => $data['Unidade'],
      );
      $result = json_encode(array('success'=>true, 'result'=>$datauser));
      echo $result;
    }

    //deletar Buffet
    elseif($postjson['aksi']=='delBuffet'){
      $query = mysqli_query($mysqli, "DELETE FROM listaalimentos WHERE idListaAlimentos='$postjson[id]'");
      if($query) $result = json_encode(array('success'=>true, 'result'=>'success', 'msg'=>'Deletado com sucesso'));
      else $result = json_encode(array('success'=>false, 'result'=>'error', 'msg'=>'Erro ao deletar'));
      echo $result;
    }

    //método de selecionar serviço para meus serviços
    elseif($postjson['aksi']=='getservico'){
      $data = array();
      $query = mysqli_query($mysqli, "SELECT * FROM service WHERE idUsuario='$postjson[idUsuario]' ORDER BY idService LIMIT $postjson[start],$postjson[limit]");

      while($row = mysqli_fetch_array($query)){

        $data[] = array(
          'idService' => $row['idService'],
          'Nome' => $row['Nome'],
          'Tipo' => $row['Tipo'],
          'Descricao' => $row['Descricao'],
        );
      }

      if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
      else $result = json_encode(array('success'=>false));

      echo $result;

    }

   //metodo para selecionar servicos para perfil serviço
   elseif($postjson['aksi']=='selectServico'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT * FROM service WHERE idService='$postjson[id_servico]'");

    $data = mysqli_fetch_array($query);
    $datauser = array(
      'id_servico' => $data['idService'],
      'nome_servico' => $data['Nome'],
      'tipo_servico' => $data['Tipo'],
      'descricao_servico' => $data['Descricao'],
    );
    $result = json_encode(array('success'=>true, 'result'=>$datauser));
    echo $result;
  }

  //tela pesquisar
  elseif($postjson['aksi']=='getdestaque'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT * FROM service ORDER BY idService LIMIT $postjson[start],$postjson[limit]");

    while($row = mysqli_fetch_array($query)){

      $data[] = array(
        'idService' => $row['idService'],
        'Nome' => $row['Nome'],
        'Tipo' => $row['Tipo'],
        'Descricao' => $row['Descricao'],
      );
    }

    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false));

    echo $result;

  }

  //método para adicionar Buffet
  elseif($postjson['aksi']=='addBuffet'){
    $query = mysqli_query($mysqli, "INSERT INTO listaalimentos SET
      Nome = '$postjson[nome]',
      Tipo = '$postjson[tipo]',
      Quantidade = '$postjson[Quantidade]',
      Unidade = '$postjson[Unidade]',
      idEvento = '$postjson[IdEvento]',
      Situacao = 'false'
    ");

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Erro! Por favor tente novamente'));

    echo $result;

  }

  //metodo adicionar convidados
  elseif($postjson['aksi']=='adicionarConvidados'){
    $query = mysqli_query($mysqli, "INSERT INTO listaconvidados SET
      idEvento = '$postjson[idEvento]',
      Nome = '$postjson[nome]',
      Tipo = '$postjson[tipo]',
      Situacao = 'false'
    ");

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Erro! Por favor tente novamente'));

    echo $result;
  }

  //getconvidados
  elseif($postjson['aksi']=='getConvidados'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT * FROM listaconvidados WHERE idEvento='$postjson[idEvento]' ORDER BY Nome");
    while($row = mysqli_fetch_array($query)){
      $data[] = array(
        'idListaConvidados' => $row['idListaConvidados'],
        'Nome' => $row['Nome'],
        'Tipo' => $row['Tipo'],
        'Situacao' => $row['Situacao'],
      );
    }
    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false));
    echo $result;
  }
  //contaiza quantos convidados há
  elseif($postjson['aksi']=='total'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT count(*) FROM listaconvidados where idEvento='$postjson[idEvento]'");
    $data = mysqli_fetch_array($query);
    $datauser = array(
      'Total' => $data['count(*)'],
    );
    $result = json_encode(array('success'=>true, 'result'=>$datauser));
    echo $result;
  }

  //alterar situacao dos convidados
  elseif($postjson['aksi']=='situacaoConvidados'){
    $query = mysqli_query($mysqli, "UPDATE listaconvidados SET
      Situacao = '$postjson[situacao]' WHERE idListaConvidados='$postjson[id]'
    ");
    if($query) $result = json_encode(array('success' => true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Erro!'));
    echo $result;
  }

  //metodo selecionar convidados
  elseif($postjson['aksi']=='selectConvidados'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT * FROM listaconvidados where idListaConvidados='$postjson[id]'");
    $data = mysqli_fetch_array($query);
    $datauser = array(
      'idlistaConvidados' => $data['idListaConvidados'],
      'Nome' => $data['Nome'],
      'Tipo' => $data['Tipo'],
    );
    $result = json_encode(array('success'=>true, 'result'=>$datauser));
    echo $result;
  }

  //método para alterar Convidado
  elseif($postjson['aksi']=='alterarConvidado'){
    $query = mysqli_query($mysqli, "UPDATE listaconvidados SET
      Nome = '$postjson[nome]',
      Tipo= '$postjson[tipo]' WHERE idListaConvidados='$postjson[id]'
    ");
    if($query) $result = json_encode(array('success' => true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Erro!'));
    echo $result;
  }

  //metodo deletar convidados
  elseif($postjson['aksi']=='delConvidado'){
    $query = mysqli_query($mysqli, "DELETE FROM listaconvidados WHERE idListaConvidados='$postjson[id]'");
    if($query) $result = json_encode(array('success'=>true, 'result'=>'success', 'msg'=>'Deletado com sucesso'));
    else $result = json_encode(array('success'=>false, 'result'=>'error', 'msg'=>'Erro ao deletar'));
    echo $result;
  }

  //método para selecionar Buffet
  elseif($postjson['aksi']=='selectBuffet'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT * FROM listaalimentos where idEvento='$postjson[idEvento]' AND Tipo='$postjson[filtro]' ORDER BY Nome");

    while($row = mysqli_fetch_array($query)){

      $data[] = array(
        'idListaAlimentos' => $row['idListaAlimentos'],
        'Nome' => $row['Nome'],
        'Tipo' => $row['Tipo'],
        'Quantidade' => $row['Quantidade'],
        'Unidade' => $row['Unidade'],
        'Situacao' => $row['Situacao']
      );
    }

    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false, 'mgs'=>'Erro'));

    echo $result;
  }
?>
