<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 12.03.2019
 * Time: 3:37
 */
require_once "connect_to_base.php";

if (isset($_GET["login"]) && isset($_GET["pass"]))
{
    if(!empty($_GET["login"]) && !empty($_GET["pass"]))
    {
        $login = $_GET["login"];
        $password = $_GET["pass"];

        $query = "ALTER TABLE Users AUTO_INCREMENT=1";
        $res = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));

        $query = "SELECT login FROM Users";
        $res = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
        $count = 0;
        while ($row = mysqli_fetch_array($res, MYSQLI_ASSOC)) {
            if ($row['login'] == $login)
                $count++;
        }
        if ($count == 0) {
            /* $query = "INSERT INTO Users (`id_user`, `login`, `password`)
            VALUES ('$row1[total]'+1,'$login', '$password')";*/
            $query = "INSERT INTO Users (`login`, `password`, `prava`) 
                VALUES ('$login', '$password', 10)";
            $res = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
            /*if ($res) {
                echo "Выполнение запроса на добавление новой информации в таблицу Training прошло успешно!";
                echo "<br/>";
                echo "<br/>";
            }*/
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
        // закрываем подключение
        mysqli_close($link);
    }
    else
    {
        $result = array("2" => "Поля не должны быть пустыми!");
        // Переводим массив в JSON
        echo json_encode($result);
        // закрываем подключение
        mysqli_close($link);
    }
}
