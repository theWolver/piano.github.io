<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 08.03.2019
 * Time: 14:03
 */
require_once( 'connect_to_base.php' ); // Подключаем файл для соединения с СУБД MySQL
require_once( 'classes\Training.php' ); //Подключаем файл с классом Training

$objTraining = new classes\Training(); //указываем после new папку где лежит описание класса (это надо когда объявление объекта не в том же файле где и описание класса
$objTraining->setUser($_GET['user']);
$objTraining->setComposition($_GET['composition']);
$objTraining->setUserArray($_GET['id']);
$objTraining->updateTraining($pdo);
