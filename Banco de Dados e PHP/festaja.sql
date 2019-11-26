create database festaja;
use festaja;

-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: festaja
-- ------------------------------------------------------
-- Server version	5.0.45-community-nt

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Not dumping tablespaces as no INFORMATION_SCHEMA.FILES table on this server
--

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avaliacao` (
  `idAvaliacao` int(11) NOT NULL auto_increment,
  `Avaliacao` int(11) NOT NULL,
  `Comentario` varchar(45) NOT NULL,
  `idService` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY  (`idAvaliacao`),
  KEY `FK_Service1_idx` (`idService`),
  key `FK_Usuario1_idx` (`idUsuario`),
  CONSTRAINT `FK_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Service1` FOREIGN KEY (`idService`) REFERENCES `service` (`idService`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliação`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `idEvento` int(11) NOT NULL auto_increment,
  `idUsuario` int(11) NOT NULL,
  `NomeEvento` varchar(50) NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Data_Inicio` date NOT NULL,
  `Data_Fim` date NOT NULL,
  `Hora_Inicio` time NOT NULL,
  `Hora_Fim` time NOT NULL,
  `CEP` varchar(20) NOT NULL,
  `Estado` char(2) NOT NULL,
  `Cidade` varchar(100) NOT NULL,
  `Bairro` varchar(100) NOT NULL,
  `Endereco` varchar(100) NOT NULL,
  `Numero` int(11) NOT NULL,
  `Complemento` varchar(50) default NULL,
  `Cor` varchar(50) default NULL,
  PRIMARY KEY  (`idEvento`),
  KEY `FK_Usuario2_idx` (`idUsuario`),
  CONSTRAINT `FK_Usuario2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagem`
--

DROP TABLE IF EXISTS `imagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagem` (
  `idImagem` int(11) NOT NULL auto_increment,
  `Imagem` varchar(500) NOT NULL,
  `idService` int(11) NOT NULL,
  PRIMARY KEY  (`idImagem`),
  KEY `FK_Servico2_idx` (`idService`),
  CONSTRAINT `FK_Service2` FOREIGN KEY (`idService`) REFERENCES `service` (`idService`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagem`
--

LOCK TABLES `imagem` WRITE;
/*!40000 ALTER TABLE `imagem` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagem` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `listaalimentos`
--

DROP TABLE IF EXISTS `listaalimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listaalimentos` (
  `idListaAlimentos` int(11) NOT NULL auto_increment,
  `idEvento` int(11) NOT NULL,
  `Nome` varchar(85) NOT NULL,
  `Tipo` varchar(85) NOT NULL,
  `Quantidade` double NOT NULL,
  `Unidade` char(10) NOT NULL,
  `Situacao` char(2) NOT NULL,
  PRIMARY KEY  (`idListaAlimentos`),
  KEY `FK_Evento1_idx` (`idEvento`),
  CONSTRAINT `FK_Evento1` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listaalimentos`
--

LOCK TABLES `listaalimentos` WRITE;
/*!40000 ALTER TABLE `listaalimentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `listaalimentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listaconvidados`
--

DROP TABLE IF EXISTS `listaconvidados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listaconvidados` (
  `idListaConvidados` int(11) NOT NULL auto_increment,
  `IdEvento` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Situacao` char(2) NOT NULL,
  PRIMARY KEY  (`idListaConvidados`),
  KEY `FK_Evento2_idx` (`IdEvento`),
  CONSTRAINT `FK_Evento2` FOREIGN KEY (`IdEvento`) REFERENCES `evento` (`idEvento`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listaconvidados`
--

LOCK TABLES `listaconvidados` WRITE;
/*!40000 ALTER TABLE `listaconvidados` DISABLE KEYS */;
/*!40000 ALTER TABLE `listaconvidados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listaservice`
--

DROP TABLE IF EXISTS `listaservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listaservice` (
  `idListaService` int(11) NOT NULL auto_increment,
  `idService` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `Situacao` char(2) NOT NULL,
  PRIMARY KEY  (`idListaService`),
  KEY `FK_Service3_idx` (`idService`),
  KEY `FK_Evento3_idx` (`idEvento`),
  CONSTRAINT `FK_Service3` FOREIGN KEY (`idService`) REFERENCES `service` (`idService`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Evento3` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listaservice`
--

LOCK TABLES `listaservice` WRITE;
/*!40000 ALTER TABLE `listaservice` DISABLE KEYS */;
/*!40000 ALTER TABLE `listaservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service` (
  `idService` int(11) NOT NULL auto_increment,
  `idUsuario` int(11) NOT NULL,
  `Nome` varchar(85) NOT NULL,
  `Tipo` varchar(85) NOT NULL,
  `Descricao` varchar(500) NOT NULL,
  `CEP` varchar(20) NOT NULL,
  `Estado` char(2) NOT NULL,
  `Cidade` varchar(100) NOT NULL,
  `Bairro` varchar(100) NOT NULL,
  `Endereco` varchar(100) NOT NULL,
  `Numero` int(11) NOT NULL,
  `Complemento` varchar(50) default NULL,
  `Celular` varchar(50) NOT NULL,
  `Telefone` varchar(50) default NULL,
  `SecundContat` varchar(50) default NULL,
  `Email` varchar(100) default NULL,
  PRIMARY KEY  (`idService`),
  KEY `FK_Usuario3_idx` (`idUsuario`),
  CONSTRAINT `FK_Usuario3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo` (
  `idTipo` int(11) NOT NULL auto_increment,
  `Nome` varchar(45) NOT NULL NULL,
  PRIMARY KEY  (`idTipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo`
--

LOCK TABLES `tipo` WRITE;
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL auto_increment,
  `idTipo` int(11) NOT NULL,
  `Nome` varchar(100) default NULL,
  `Email` varchar(100) default NULL,
  `Login` varchar(20) NOT NULL,
  `Senha` varchar(100) NOT NULL,
  `CPF` varchar(16) default NULL,
  `Celular` varchar(24) default NULL,
  `Telefone` varchar(24) default NULL,
  `SecunContat` varchar(24) default NULL,
  `DataNasc` date default NULL,
  `FirstTime` char(2) NOT NULL,
  `Status` char(2) NOT NULL,
  PRIMARY KEY  (`idUsuario`),
  KEY `FK_Tipo1_idx` (`idTipo`),
  CONSTRAINT `FK_Tipo1` FOREIGN KEY (`idTipo`) REFERENCES `tipo` (`idTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacao`
--

DROP TABLE IF EXISTS `notificacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificacao` (
  `idNotificacao` int(11) NOT NULL auto_increment,
  `Mensagem` varchar(500) NOT NULL,
  PRIMARY KEY  (`idNotificacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaco`
--

LOCK TABLES `notificacao` WRITE;
/*!40000 ALTER TABLE `notificacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listanotificacao`
--

DROP TABLE IF EXISTS `listanotificacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listanotificacao` (
  `idListaNotificacao` int(11) NOT NULL auto_increment,
  `idUsuario` int(11) NOT NULL,
  `idNotificacao` int(11) NOT NULL,
  PRIMARY KEY  (`idListaNotificacao`),
  KEY `FK_Usuario4_idx` (`idUsuario`),
  KEY `FK_Notificacao_idx` (`idNotificacao`),
  CONSTRAINT `FK_Usuario4` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Notificacao` FOREIGN KEY (`idNotificacao`) REFERENCES `notificacao` (`idNotificacao`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listanotificacao`
--

LOCK TABLES `listanotificacao` WRITE;
/*!40000 ALTER TABLE `listanotificacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `listanotificacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `codigo`
--

DROP TABLE IF EXISTS `codigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `codigo` (
  `idCodigo` int(11) NOT NULL auto_increment,
  `idUsuario` int(11) NOT NULL,
  `Token1` int(2) NOT NULL,
  `Token2` int(2) NOT NULL,
  `Token3` int(2) NOT NULL,
  `Token4` int(2) NOT NULL,
  `Criado` datetime NOT NULL,
  PRIMARY KEY  (`idCodigo`),
  KEY `FK_Usuario5_idx` (`idUsuario`),
  CONSTRAINT `FK_Usuario5` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `codigo`
--

LOCK TABLES `codigo` WRITE;
/*!40000 ALTER TABLE `codigo` DISABLE KEYS */;
/*!40000 ALTER TABLE `codigo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-20 14:38:44

INSERT INTO tipo (Nome) 
VALUES ('Usuário');

INSERT INTO tipo (Nome) 
VALUES ('Fornecedor');

INSERT INTO tipo (Nome) 
VALUES ('Admin');
