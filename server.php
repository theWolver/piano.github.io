<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 08.03.2019
 * Time: 14:03
 */
require_once( 'connect_to_base.php' ); // Подключаем файл для соединения с СУБД MySQL

$id_user = $_GET['user'];
$arr = $_GET['id'];
$id_composition = $_GET['composition'];

//if (isset($_GET['id']) && !empty($_GET['id']))  //это избыточно тут
//{
    $query = "UPDATE Training SET `user_array`='$arr' WHERE `id_user`='$id_user' AND `id_composition`=$id_composition";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    if ($result)
    {
        echo "Выполнение запроса на изменение данных в таблицу Training прошло успешно!";
        echo "<br/>";
        echo "<br/>";
    }
    /*var_dump($_GET['id']);
    var_dump(json_decode($_GET['id'], true));*/
    $localStorage=json_decode($_GET['id'], true);
    foreach ($localStorage as $key => $value)
        echo "Вы нажали ".$key."-ю ноту с кодом: ".$value."!".'</br>';
/*}
else
{
    echo "id пустое, у нас проблемы!";
}*/