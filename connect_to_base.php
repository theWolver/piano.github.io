<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 10.03.2019
 * Time: 15:32
 */

$host = 'localhost'; // адрес сервера
$database = 'piano'; // имя базы данных
$user = 'root'; // имя пользователя
$password = ''; // пароль
// подключаемся к серверу
$link = mysqli_connect($host, $user, $password, $database)
or die("Ошибка " . mysqli_error($link));