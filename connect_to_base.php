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
$charset = 'utf8mb4';
// подключаемся к серверу
$dsn = "mysql:host=$host;dbname=$database;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
try
{
    /** @var $pdo PDO  */
    $pdo = new PDO($dsn, $user, $password, $options);
}
catch (\PDOException $e)
{
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}