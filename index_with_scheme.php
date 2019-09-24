<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 01.02.2019
 * Time: 18:04
 */
session_start();
require_once( 'connect_to_base.php' );
$id_user = $_SESSION['id']; //идентификатор пользователя
$roots = $_SESSION['roots'];//права юзера (админ или нет)
$name = $_COOKIE['login'];//имя аккаунта пользователя
$style=""; //начальная инициализация, дабы убрать предупреждение variable might not been defined
$style1="";// --//--
if($id_user=="")
    header ('location:Intro.html'); //если пользователь вернётся по стрелкам назад на стр., после того как пропала сессия (из-за windows.open) - надо сделать снова редирект
if($roots==1) {
    $style= "<style type=\"text/css\">#notes_staff_admin {display:block;}</style>"; // меняет стиль блоков, которые будут видимые если на сайт зашёл админ и невидимые если юзер
    $style1 = "<style type=\"text/css\">#submit {display:block;}</style>";
}

$arr = ""; //переменная для хранения массива нот
$id_composition=1; //идентификатор композиции (изначально при загрузке страницы = 1)
$found_composition=false; //флаг, показывающий найдена ли композиция из списка всех сыгранных ранее композиций для $id_user
if (isset($id_user) && !empty($id_user))
{
    //проверяем зашёл новый id_user или запись о нём уже есть в таблице Training
    $query = "SELECT COUNT(*) AS total FROM Training WHERE `id_user`=$id_user";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    if ($row['total'] == 0) //если =0, то это новый пользователь   <=== ТУТ ДОДЕЛЫВАТЬ ЕЩЁ!
    {
        //записываем новую строку в таблицу Training
        New_Insert($link, $id_user, $id_composition, $arr);
    } else  //найдено >=1 записей для текущего id_user'a
    {
        //запрашиваем список композиций, на которых тренировался id_user
        $query = "SELECT `id_composition` AS composition FROM Training WHERE `id_user`=$id_user"; //ищем общее к-во записей в таблице
        $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
        while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
        {
            //если нашлось совпадение $id_composition с базой - продолжить тренировку
            if ($row['composition'] == $id_composition)
            {
                $found_composition=true;
                break; //прерываем перебор композиций из базы, т.к. нашли нужную и идём дальше тренироваться на этой композиции
            }
        }
        if($found_composition)
        {
            $arr = Current_Array($link, $id_user, $id_composition);
        }
        else //иначе если совпадений нет - это новая композиция для данного пользователя id_user
        {
            echo "Композиция " . $id_composition . " не найдена";
            // New_Insert($link, $id_user, $id_composition, $arr);
        }
    }
}

function New_Insert($link, $id_user, $id_composition, $arr)
{
    $query = "INSERT INTO Training (`id_user`, `id_composition`, `user_array`) VALUES ('$id_user', '$id_composition', '$arr')";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
  /*  if ($result)
    {
        echo "Выполнение запроса на добавление новой информации в таблицу Training прошло успешно!";
        echo "<br/>";
        echo "<br/>";
    }*/
}

function Current_Array($link, $id_user, $id_composition)
{
    $query = "SELECT `user_array` AS user_array FROM Training WHERE `id_user`=$id_user AND `id_composition`=$id_composition";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    return($row['user_array']);
}
include 'Index_with_scheme.html';




