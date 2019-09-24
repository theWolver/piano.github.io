<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 05.07.2019
 * Time: 18:52
 */

require_once( 'connect_to_base.php' ); // Подключаем файл для соединения с СУБД MySQL

$id_composition = $_GET['composition'];
$arr = Current_Array($link, $id_composition);
// Переводим массив в JSON
echo json_encode($arr);
// закрываем подключение
mysqli_close($link);

function Current_Array($link, $id_composition)
{
    $query = "SELECT `array` AS array_composition, `title` AS title, `ClientWidth` AS width, `ClientHeight` AS height FROM Composition WHERE `id_composition`=$id_composition";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    if ($result)
    {
        $string = $row['array_composition'];
        $string=trim($string, "[]");
        $arr = explode("],[", $string);
        // Формируем массив для JSON ответа
        $res = array(
            'array' => $arr,//$row['array_composition'],
            'title' => $row['title'],
            'width' => $row['width'],
            'height'=> $row['height']
        );
        /* echo "Выполнение запроса на выборку информации из таблицы Composition прошло успешно!";
         echo "<br/>";
         echo "<br/>";*/
    }
    else  //<=== НЕ ПРОВЕРЯЛ!!!
    {
        // "есть ошибки - передаём номер - $kay и текст ошибки - $value";
        $res = array();
    }
    return($res);
}