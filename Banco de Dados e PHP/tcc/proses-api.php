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
        'idTipo' => $data['idTipo']
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
    $query = mysqli_query($mysqli, "SELECT * FROM usuario WHERE login='$postjson[username]' OR senha='$password' OR email='$postjson[email]' OR cpf='$postjson[cpf]'");
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
        'TipoEvento' => $row['Tipo']
      );
    }

    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
    else $result = json_encode(array('success'=>false));

    echo $result;

  }

//método para adicionar evento
  elseif($postjson['aksi']=='addEvento'){
    $data = array();
    $query = mysqli_query($mysqli, "INSERT INTO evento SET
      NomeEvento = '$postjson[nome]',
      Tipo = '$postjson[tipo]',
      idUsuario = '$postjson[IdUsuario]'
    ");

    if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
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
    $query = mysqli_query($mysqli, "SELECT * FROM evento where idEvento='$postjson[idEvento]'");

    $data = mysqli_fetch_array($query);
    $datauser = array(
      'idEvento' => $data['idEvento'],
      'NomeEvento' => $data['NomeEvento'],
      'Tipo' => $data['Tipo']
    );
    $result = json_encode(array('success'=>true, 'result'=>$datauser));
    echo $result;
  }



?>
