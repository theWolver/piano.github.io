<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 12.03.2019
 * Time: 3:37
 */
require_once "connect_to_base.php";
/**
 * @var $pdo PDO
 */

if (isset($_GET["login"]) && isset($_GET["pass"]))
{
    if(!empty($_GET["login"]) && !empty($_GET["pass"]))
    {
        $login = $_GET["login"];
        $password = $_GET["pass"];

        $stmt = $pdo->prepare("ALTER TABLE Users AUTO_INCREMENT=1");
        $stmt->execute();

        $stmt = $pdo->prepare("SELECT login FROM Users WHERE `login`=:login");
        $stmt->execute(['login'=>$login]);
        $count = $stmt->rowCount();

        if ($count == 0)
        {
            $users_root = 10; //значение для прав юзера (если админ то = 1)
            $new_password = password_hash($password, PASSWORD_DEFAULT); // шифруем пароль с помощью password_hash()
            $stmt = $pdo->prepare("INSERT INTO users (login, password, prava) VALUES (:login, :password, :prava)");
            $stmt->execute(['login' => $login, 'password' => $new_password, 'prava' => $users_root]);

            // Формируем массив для JSON ответа
            $result = array(
                'login' => $_GET["login"],
                'pass' => $_GET["pass"]
            );
        }
        else
        {
            $result = array("1" => "Такой пользователь уже есть! Введите другой логин");
        }
        // Переводим массив в JSON
        echo json_encode($result);
    }
    else
    {
        $result = array("2" => "Поля не должны быть пустыми!");
        // Переводим массив в JSON
        echo json_encode($result);
    }
}
