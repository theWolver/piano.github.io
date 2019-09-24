<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 14.06.2019
 * Time: 16:22
 */
require_once( 'connect_to_base.php' ); // Подключаем файл для соединения с СУБД MySQL

$id_composition = $_GET['id'];
$arr = $_GET['mass'];
$count_note_position = $_GET['count'];
$width = $_GET['my_width'];
$height = $_GET['my_height'];
//если была нажата кнопка submit, но не было выбрано ни единой ноты
if($count_note_position==0)
    $result="Вы не выбрали ни одну ноту! Координаты нот не были добавлены в базу.";
else //если ноты выбраны
{
    $result=Save_Array($link, $id_composition, $arr, $count_note_position, $width, $height); //сохраняем ноты в базу в таблицу Composition
    if($result)
        $result="Данные успешно добавлены в таблицу Composition.";
    else
        $result="Ошибка при сохранении данных";
}
// Переводим массив в JSON
echo $result;

function Save_Array($link, $id_composition, $arr, $count_note_position, $width, $height)
{
    $query = "UPDATE Composition SET `number_of_notes`='$count_note_position', `array`='$arr', `ClientWidth`='$width', `ClientHeight`='$height' WHERE `id_composition`='$id_composition'";
    $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
    return($result);
}

//а ещё надо сделать Insert, который добавит саму ту запись в бд, которую я делаю UPDATE