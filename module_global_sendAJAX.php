<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 17.03.2019
 * Time: 23:34
 */
require_once( 'connect_to_base.php' ); //подключаемся к БД
/**
 * @var $pdo PDO
 */
$login = $_GET['login'];
$password = $_GET['pass'];
if (login($pdo)) //вызываем функцию login, определяющую, авторизирован юзер или нет
{
    $UID = $_SESSION['id']; //если юзер авторизирован, присвоим переменной $UID его id
    $admin = is_admin($UID, $pdo); //определяем, админ ли юзер
    $_SESSION['roots'] = "$admin";    //записываем в сессию уровень прав юзера
    // Формируем массив для JSON ответа
    $result = array(
        'login' => $_GET["login"],
        'pass' => $_GET["pass"]
    );
    // Переводим массив в JSON
    echo json_encode($result);
}
else //если пользователь не авторизирован, то проверим, была ли нажата кнопка входа на сайт
{
    if(isset($_GET['log_in']))
    {
        $error = enter($pdo); //функция входа на сайт
       // echo $error[0].'<br/>';
        if (count($error) == 0) //если нет ошибок, авторизируем юзера
        {
            $UID = $_SESSION['id'];
            $admin = is_admin($UID, $pdo);
            $_SESSION['roots'] = "$admin";

            // Формируем массив для JSON ответа
            $result = array(
                'login' => $_GET["login"],
                'pass' => $_GET["pass"]
            );
        }
        else{
            // "есть ошибки - передаём номер - $kay и текст ошибки - $value";
            $result = array();
            foreach ($error as $kay => $value)
                $result[$kay] = $value;
        }
        // Переводим массив в JSON
        echo json_encode($result);
    }
}
//============================================================================
function enter($pdo)
{
    /**
     * @var $pdo PDO
     */
    $error = array(); //массив для ошибок
    if ($_GET['login'] != "" && $_GET['pass'] != "") //если поля заполнены
    {
        $login = $_GET['login'];
        $password = $_GET['pass'];

        $stmt = $pdo->prepare("SELECT * FROM Users WHERE `login` = :login"); //запрашиваем строку из БД с логином, введённым пользователем
        $stmt->execute(['login' => $login]);
        $rowCount = $stmt->rowCount();
        if ($rowCount == 1) //если нашлась одна строка, значит такой юзер существует в БД
        {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            //сравниваем хэшированный пароль из БД с хэшированными паролем, введённым пользователем
            if(password_verify($password, $row["password"]))
            {
                //пишем логин и хэшированный пароль в cookie, также создаём переменную сессии
                setcookie ("login", $row['login'], time() + 50000);
                setcookie ("password", md5($row['login'].$row['password']), time() + 50000);
                $_SESSION['id'] = $row['id_user'];	//записываем в сессию id пользователя
                $id = $_SESSION['id'];
                lastAct($id, $pdo);
                return $error;
            }
            else //если пароли не совпали
            {
                $error[1] = "Неверный пароль";
                return $error;
            }
        }
        else //если такого пользователя не найдено в БД
        {
            $error[2] = "Пользователь с таким логином не найден";
            return $error;
        }
    }
    else
    {
        $error[3] = "Поля не должны быть пустыми!";
        return $error;
    }
}
//---------------------------------------------------------
function lastAct($id, $pdo)
{
/*    $tm = time();
    $query = "UPDATE Users SET online='$tm', last_act='$tm' WHERE id_user='$id'";
    $rez = mysqli_query($pdo, $query) or die("Ошибка " . mysqli_error($pdo));
*/}
//---------------------------------------------------------
function login ($pdo)
{
    /**
     * @var $pdo PDO
     */
    ini_set ("session.use_trans_sid", true);
    session_start();
    if (isset($_SESSION['id']))//если сесcия есть
    {
        if(isset($_COOKIE['login']) && isset($_COOKIE['password'])) //если cookie есть, то просто обновим время их жизни и вернём true 		{
        {
            SetCookie("login", "", time() - 1, '/');
            SetCookie("password","", time() - 1, '/');
            setcookie ("login", $_COOKIE['login'], time() + 50000, '/');
            setcookie ("password", $_COOKIE['password'], time() + 50000, '/');
            $id = $_SESSION['id'];
            lastAct($id, $pdo);
            return true;
        }
        else //иначе добавим cookie с логином и паролем, чтобы после перезапуска браузера сессия не слетала
        {
            $stmt = $pdo->prepare("SELECT * FROM Users WHERE `id_user`=:id_user"); //запрашиваем строку с искомым id
            $stmt->execute(['id_user' => $_SESSION['id']]);
            $rowCount = $stmt->rowCount();
            if ($rowCount == 1) //если получена одна строка
            {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                //$row = mysqli_fetch_assoc($rez); //записываем её в ассоциативный массив
                setcookie ("login", $row['login'], time()+50000, '/');
                setcookie ("password", md5($row['login'].$row['password']), time() + 50000, '/');
                $id = $_SESSION['id'];
                lastAct($id, $pdo);
                return true;
            }
            else
                return false;
        }
    }
    else //если сессии нет, то проверим существование cookie. Если они существуют, то проверим их валидность по БД
    {
        if(isset($_COOKIE['login']) && isset($_COOKIE['password'])) //если куки существуют.
        {
            $stmt = $pdo->prepare("SELECT * FROM Users WHERE `login`=:login"); //запрашиваем строку с искомым логином и паролем
            $stmt->execute(['login'=>$_COOKIE['login']]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $rowCount = $stmt->rowCount();
            if($rowCount == 1 && md5($row['login'].$row['password']) == $_COOKIE['password']) //если логин и пароль нашлись в БД
            {
                $_SESSION['id'] = $row['id_user']; //записываем в сесиию id
                $id = $_SESSION['id'];
                lastAct($id,$pdo);
                return true;
            }
            else //если данные из cookie не подошли, то удаляем эти куки, ибо нахуй они такие нам не нужны
            {
                SetCookie("login", "", time() - 360000, '/');
                SetCookie("password", "", time() - 360000, '/');
                return false;
            }
        }
        else //если куки не существуют
        {
            $UID = false;
            echo $UID; //временная строка чтобы не мешалась в ошибках             <==== ВАЖНО!!!
            /*SetCookie("my_UID", $_COOKIE["$UID"], time() - 1, '/');
            setcookie("my_UID", $_COOKIE["$UID"], time() + 180, '/');*/
            return false;
        }
    }
}
//---------------------------------------------------------
function is_admin($id, $pdo)
{
    /**
     * @var $pdo PDO
     */
    $stmt = $pdo->prepare("SELECT `prava` FROM Users WHERE `id_user`=:id");
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row['prava'];

    /*if (mysqli_num_rows($rez) == 1)
    {
        //$roots = mysql_result($rez, 0);
        $rez->data_seek(0);
        $roots = $rez->fetch_row();
        if ($roots[0] == 1)
            return true;
        else
            return false;
    }
    else
        return false;*/
}
//---------------------------------------------------------
