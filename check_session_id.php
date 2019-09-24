<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 28.05.2019
 * Time: 2:12
 */

session_start();
$id = $_SESSION['id'];
if ((isset($id))&&(!empty($id)))
    echo json_encode(1);
else
    echo json_encode(0);