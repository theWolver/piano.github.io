<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 17.09.2019
 * Time: 15:59
 */
//узнаю какую композицию выбрали в <select>
$query ="SELECT `id_composition`, `title`, `path_to_file` FROM Composition";
$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));
/*if(!$result)
{
    echo "Выполнение запроса SELECT не прошло успешно";
    echo "<br/>";
}*/
while($row = mysqli_fetch_array($result, MYSQLI_ASSOC))
{
    echo('<option value='.$row['id_composition'].','.$row["path_to_file"].'>'.$row["title"].'</option>');
}
