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
  `idAvaliacao` int(11) NOT NULL,
  `Avaliacao` int(11) default NULL,
  `Comentário` varchar(45) default NULL,
  `idService` int(11) default NULL,
  `Avaliaçãocol` varchar(45) default NULL,
  PRIMARY KEY  (`idAvaliacao`),
  KEY `FK_Service45_idx` (`idService`),
  CONSTRAINT `FK_Service45` FOREIGN KEY (`idService`) REFERENCES `service` (`idService`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `NomeEvento` varchar(100) default NULL,
  `Tipo` varchar(100) default NULL,
  `Data` datetime default NULL,
  `CEP` varchar(100) default NULL,
  `Estado` varchar(100) default NULL,
  `Cidade` varchar(100) default NULL,
  `Bairro` varchar(100) default NULL,
  `Endereco` varchar(100) default NULL,
  `Numero` int(11) default NULL,
  `Complemento` varchar(100) default NULL,
  PRIMARY KEY  (`idEvento`),
  KEY `FK_Usuario1_idx` (`idUsuario`),
  CONSTRAINT `FK_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `idImagem` int(11) NOT NULL,
  `Imagem` varchar(45) NOT NULL,
  `idService` int(11) NOT NULL,
  PRIMARY KEY  (`idImagem`),
  KEY `FK_Servico34_idx` (`idService`),
  CONSTRAINT `FK_Servico34` FOREIGN KEY (`idService`) REFERENCES `service` (`idService`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `itens`
--

DROP TABLE IF EXISTS `itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itens` (
  `idItens` int(11) NOT NULL,
  `Nome` varchar(45) default NULL,
  `Categoria` varchar(45) default NULL,
  `Tipo` varchar(45) default NULL,
  `Unidade` varchar(45) default NULL,
  PRIMARY KEY  (`idItens`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens`
--

LOCK TABLES `itens` WRITE;
/*!40000 ALTER TABLE `itens` DISABLE KEYS */;
/*!40000 ALTER TABLE `itens` ENABLE KEYS */;
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
  `Nome` varchar(100) default NULL,
  `Tipo` varchar(100) default NULL,
  `Quantidade` double default NULL,
  `Unidade` varchar(10) default NULL,
  `Situacao` tinyint(4) default NULL,
  PRIMARY KEY  (`idListaAlimentos`),
  KEY `FK_Evento7_idx` (`idEvento`),
  CONSTRAINT `FK_Evento7` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `IdEvento` int(11) default NULL,
  `Nome` varchar(100) default NULL,
  `Celular` varchar(100) default NULL,
  `Email` varchar(100) default NULL,
  `Sexo` varchar(45) default NULL,
  `Faixa_Etaria` varchar(45) default NULL,
  `Situacao` tinyint(4) default NULL,
  PRIMARY KEY  (`idListaConvidados`),
  KEY `FK_Evento45_idx` (`IdEvento`),
  CONSTRAINT `FK_Evento45` FOREIGN KEY (`IdEvento`) REFERENCES `evento` (`idEvento`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `listaitens`
--

DROP TABLE IF EXISTS `listaitens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listaitens` (
  `idListaItens` int(11) NOT NULL,
  `idItens` int(11) default NULL,
  `idSimulacao` int(11) default NULL,
  `Qtd` int(11) default NULL,
  PRIMARY KEY  (`idListaItens`),
  KEY `FK_Itens_idx` (`idItens`),
  KEY `FK_Simulacao_idx` (`idSimulacao`),
  CONSTRAINT `FK_Itens` FOREIGN KEY (`idItens`) REFERENCES `itens` (`idItens`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Simulacao` FOREIGN KEY (`idSimulacao`) REFERENCES `simulacao` (`idSimulação`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listaitens`
--

LOCK TABLES `listaitens` WRITE;
/*!40000 ALTER TABLE `listaitens` DISABLE KEYS */;
/*!40000 ALTER TABLE `listaitens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listaservice`
--

DROP TABLE IF EXISTS `listaservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listaservice` (
  `idListaService` int(11) NOT NULL auto_increment,
  `idService` int(11) default NULL,
  `idEvento` int(11) NOT NULL,
  `Situacao` tinyint(4) default NULL,
  PRIMARY KEY  (`idListaService`),
  KEY `FK_Service2_idx` (`idService`),
  KEY `FK_Evento2_idx` (`idEvento`),
  CONSTRAINT `FK_Service2` FOREIGN KEY (`idService`) REFERENCES `service` (`idService`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Evento2` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `idUsuario` int(11) default NULL,
  `Nome` varchar(100) default NULL,
  `Tipo` varchar(100) default NULL,
  `Descricao` varchar(100) default NULL,
  PRIMARY KEY  (`idService`),
  KEY `FK_User10_idx` (`idUsuario`),
  CONSTRAINT `FK_User10` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `simulacao`
--

DROP TABLE IF EXISTS `simulacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `simulacao` (
  `idSimulação` int(11) NOT NULL,
  `idUsuario` int(11) default NULL,
  `QTDConviados` int(11) default NULL,
  `QTDMulheres` int(11) default NULL,
  `QTDHomens` int(11) default NULL,
  `QTDCriancas` int(11) default NULL,
  `Date` datetime default NULL,
  PRIMARY KEY  (`idSimulação`),
  KEY `FK_Usuario88_idx` (`idUsuario`),
  CONSTRAINT `FK_Usuario88` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `simulacao`
--

LOCK TABLES `simulacao` WRITE;
/*!40000 ALTER TABLE `simulacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `simulacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo` (
  `idTipo` int(11) NOT NULL auto_increment,
  `Nome` varchar(100) default NULL,
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
  `Login` varchar(50) NOT NULL,
  `Senha` varchar(50) NOT NULL,
  `CPF` varchar(45) default NULL,
  `Celular` varchar(45) default NULL,
  `Telefone` varchar(45) default NULL,
  `SecunContat` varchar(45) default NULL,
  `DataNasc` date default NULL,
  `FirstTime?` char(1) default NULL,
  `Status` char(1) not NULL,
  PRIMARY KEY  (`idUsuario`),
  KEY `FK_Tipo5_idx` (`idTipo`),
  CONSTRAINT `FK_Tipo19` FOREIGN KEY (`idTipo`) REFERENCES `tipo` (`idTipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
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
