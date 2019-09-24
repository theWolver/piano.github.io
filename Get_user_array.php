<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 22.05.2019
 * Time: 14:35
 */
require_once( 'connect_to_base.php' ); // Подключаем файл для соединения с СУБД MySQL

$id_user = $_GET['user'];
$id_composition = $_GET['composition'];
$num_rows=0;
[$arr,$num_rows] = Current_Array($link, $id_user, $id_composition);
//если композиция для текущего пользователя не найдена, значит он не играл её до этого,
// и в LocalStorage запишется пустой массив user_array, который сейчас передастся по JSON.
if(empty($arr)&& ($num_rows==0)) //то ыы должны сделать Insert в Training
{
    $arr="";
    New_Insert($link, $id_user, $id_composition, $arr);
}
// Переводим массив в JSON
echo json_encode($arr);
// закрываем подключение
mysqli_close($link);

function Current_Array($link, $id_user, $id_composition)
{
    $query = "SELECT `user_array` AS user_array FROM Training WHERE `id_user`=$id_user AND `id_composition`=$id_composition";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $num_rows = mysqli_num_rows($result);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    return[$row['user_array'],$num_rows];
}

function New_Insert($link, $id_user, $id_composition, $arr)
{
    $query = "INSERT INTO Training (`id_user`, `id_composition`, `user_array`) VALUES ('$id_user', '$id_composition', '$arr')";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
   /* if ($result)
    {
        echo "Выполнение запроса на добавление новой информации в таблицу Training прошло успешно!";
        echo "<br/>";
        echo "<br/>";
    }*/
}