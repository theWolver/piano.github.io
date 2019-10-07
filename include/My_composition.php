<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 17.09.2019
 * Time: 15:59
 */
//узнаю какую композицию выбрали в <select>
$stmt = $pdo->prepare("SELECT `id_composition`, `title`, `path_to_file` FROM Composition");
$stmt->execute();

while($row = $stmt->fetch(PDO::FETCH_ASSOC))
{
    echo('<option value='.$row['id_composition'].','.$row["path_to_file"].'>'.$row["title"].'</option>');
}
