<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 05.07.2019
 * Time: 1:58
 */
require_once( 'connect_to_base.php' ); // Подключаем файл для соединения с СУБД MySQL

//if($_GET['action'] == "exit") // <== НЕ ПРОВЕРЯЛ!!!
    $result=out($link); //если передана переменная action, «разавторизируем» пользователя
    if($result)
        $result="exit";
    else
        $result="Ошибка при обновлении данных";
// Переводим массив в JSON
echo $result;

function out ($link)
{
    session_start();
    $id = $_SESSION['id'];
    $roots = $_SESSION['roots'];
    /*$query = "UPDATE Users SET online=0 WHERE `id_user`='$id'"; //обнуляем поле online, говорящее, что пользователь вышел с сайта (пригодится в будущем)
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));*/
    unset($_SESSION['id']); //удаляем переменную id-сессии
    unset($_SESSION['roots']); //удаляем roots пользователя сессии
    SetCookie("login", ""); //удаляем cookie с логином
    SetCookie("password", ""); //удаляем cookie с паролем
    //header('Location: http://' . $_SERVER['HTTP_HOST'] . '/test_php/Intro.html'); //перенаправляем на главную страницу сайта
    //header ('location:Intro.html');
    $result=true;
return($result);
}
//---------------------------------------------------------