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
[$arr,$num_rows] = Current_Array($pdo, $id_user, $id_composition);
//если композиция для текущего пользователя не найдена, значит он не играл её до этого,
// и в LocalStorage запишется пустой массив user_array, который сейчас передастся по JSON.
if(empty($arr)&& ($num_rows==0)) //то ыы должны сделать Insert в Training
{
    $arr="";
    New_Insert($pdo, $id_user, $id_composition, $arr);
}
// Переводим массив в JSON
echo json_encode($arr);

function Current_Array($pdo, $id_user, $id_composition)
{
    /**
     * @var $pdo PDO
     */
    $stmt = $pdo->prepare("SELECT `user_array` AS user_array FROM Training WHERE `id_user`=:id_user AND `id_composition`=:id_composition");
    $stmt->execute(['id_user' => $id_user, 'id_composition' => $id_composition]);
    $num_rows = $stmt->rowCount();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return[$row['user_array'],$num_rows];
}

function New_Insert($pdo, $id_user, $id_composition, $arr)
{
    /**
     * @var $pdo PDO
     */
    $stmt = $pdo->prepare("INSERT INTO Training (`id_user`, `id_composition`, `user_array`) VALUES (:id_user, :id_composition, :arr)");
    $stmt->execute(['id_user' => $id_user, 'id_composition' => $id_composition, 'arr' => $arr]);
}