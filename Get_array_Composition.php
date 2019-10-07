<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 05.07.2019
 * Time: 18:52
 */

require_once( 'connect_to_base.php' ); // Подключаем файл для соединения с СУБД MySQL

$id_composition = $_GET['composition'];
$arr = Current_Array($pdo, $id_composition);
// Переводим массив в JSON
echo json_encode($arr);

function Current_Array($pdo, $id_composition)
{
    /**
     * @var $pdo PDO
     */
    $stmt = $pdo->prepare("SELECT `array` AS array_composition, `title` AS title, `ClientWidth` AS width, `ClientHeight` AS height FROM Composition WHERE `id_composition`=:id_composition");
    $stmt->execute(['id_composition' => $id_composition]);
    /*$query = "SELECT `array` AS array_composition, `title` AS title, `ClientWidth` AS width, `ClientHeight` AS height FROM Composition WHERE `id_composition`=$id_composition";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));*/
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row)
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
    }
    else  //<=== НЕ ПРОВЕРЯЛ!!!
    {
        // "есть ошибки - передаём номер - $kay и текст ошибки - $value";
        $res = array();
    }
    return($res);
}