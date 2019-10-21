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
      status   = 'y'
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
    $query = mysqli_query($mysqli, "SELECT * FROM evento where idUsuario='$postjson[idUsuario]' ORDER BY idEvento DESC LIMIT $postjson[start],$postjson[limit]");

    while($row = mysqli_fetch_array($query)){

      $data[] = array(
        'idEvento' => $row['idEvento'],
        'NomeEvento' => $row['NomeEvento'],
        'TipoEvento' => $row['Tipo'],
        'CEP' => $row['CEP'],
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
      Hora_Inicio = '$postjson[time1]'
    ");

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Erro! Por favor tente novamente'));

    echo $result;

  }

//método para deletar evento
  elseif($postjson['aksi']=='delEvento'){
    $query = mysqli_query($mysqli, "DELETE FROM evento WHERE idEvento='$postjson[idEvento]'");

    if($query) $result = json_encode(array('success'=>true, 'result'=>'success', 'msg'=>'Deletado com sucesso'));
    else $result = json_encode(array('success'=>false, 'result'=>'error', 'msg'=>'Erro ao deletar'));

    echo $result;


  }

  elseif($postjson['aksi']=='selectEvento'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT *, year(Data_Inicio), month(Data_Inicio), day(Data_Inicio), minute(Hora_Inicio), hour(Hora_Inicio) FROM evento where idEvento='$postjson[idEvento]'");

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
    );
    $result = json_encode(array('success'=>true, 'result'=>$datauser));
    echo $result;
  }

  //select buffet
  elseif($postjson['aksi']=='selectBuffet'){
    $data = array();
    $query = mysqli_query($mysqli, "SELECT * FROM listaalimentos where idEvento='$postjson[idEvento]'");

    $data = mysqli_fetch_array($query);
    $datauser = array(
      'idEvento' => $data['idEvento'],
      'idListaAlimentos' => $data['idListaAlimentos'],
      'Nome' => $data['Nome'],
      'Tipo' => $data['Tipo'],
      'Quantidade' => $data['Quantidade'],
      'Unidade' => $data['Unidade'],
    );
    $result = json_encode(array('success'=>true, 'result'=>$datauser));
    echo $result;
  }

  //método para cadastrar servico
    elseif($postjson['aksi']=='cadastrarServico'){
      $query = mysqli_query($mysqli, "INSERT INTO service SET
        idUsuario = '$postjson[IdUsuario]',
        Nome = '$postjson[nome]',
        Descricao = '$postjson[descricao]',
        Tipo = '$postjson[tipo]'
      ");

      if($query) $result = json_encode(array('success'=>true));
      else $result = json_encode(array('success'=>false, 'msg'=>'Erro! Por favor tente novamente'));

      echo $result;
    }

    //Update do perfil cliente (editar perfil)
    elseif($postjson['aksi']=='updatePerfil'){
      $query = mysqli_query($mysqli, "UPDATE usuario SET
        Nome = '$postjson[nome]',
        Email = '$postjson[email]',
        CPF =  '$postjson[cpf]',
        Celular =  '$postjson[celular]',
        Telefone =  '$postjson[telefone]',
        SecunContat =  '$postjson[contato_secundario]' WHERE idUsuario='$postjson[idUsuario]'");

      if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
      else $result = json_encode(array('success'=>false, 'result'=>'error', 'msg'=>'error2'));

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
        Hora_Inicio = '$postjson[time1]' WHERE idEvento='$postjson[idEvento]'");

      if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
      else $result = json_encode(array('success'=>false, 'result'=>'error'));

      echo $result;

    }

    //Refresh do perfil-cliente
    elseif($postjson['aksi']=='refreshPerfil'){
      $query = mysqli_query($mysqli, "SELECT * FROM usuario WHERE idUsuario='$postjson[idUsuario]'");   //aqui eu declaro qual linha do banco ele vai pegar, por exemplo, ele vai selecionar todas as informações da tabela usuario onde o idUsuairo é igual ao declarado no let la no ts da pagina q to trabalhando (editar-perfil) 
      $check = mysqli_num_rows($query); //aqui ele ta checkando para ver se existe alguma linha realmente, se n existir nenhuma linha q corresponde com o idUsuario q eu declarei mais cedo, da erro, mas como é um update é meio impossivel isso dar erro, mas isso pq eu to fazendo no usuario, se for outra coisa fica esperto para n causar esse erro fazendo ele modificar a informação q vc usa (por exemplo eu dar um update no BD mudando o id do Usuario e querer puxar o antigo id -- q ja n existe -- iria dar um erro, então fica esperto)

    if($check>0){
      $data = mysqli_fetch_array($query);
      $datauser = array(
        'idUsuario' => $data['idUsuario'],  //aqui em vez de usar $postjson, vc usa o data pq vc ta criando uma informação e não puxando de um input ou coisa do genero, n sei explicar direito, mas acho q da para entender
        'Login' => $data['Login'],
        'Nome' => $data['Nome'],
        'Email' => $data ['Email'],
        'CPF' => $data['CPF'],
        'Celular' => $data['Celular'],
        'Telefone' => $data['Telefone'],
        'SecunContat'=> $data['SecunContat']
      );

        $result = json_encode(array('success'=>true, 'result'=>$datauser)); //n esquece de declarar o result como $datauser
    }else{
      $result = json_encode(array('success'=>false, 'msg'=>'Não foi possivel atualizar as informação nesse momento')); //msg sdo erro para caso ocorra
    }

    echo $result;
  }

?>
