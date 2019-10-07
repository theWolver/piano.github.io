<?php
/**
 * Created by PhpStorm.
 * User: Wolverine
 * Date: 24.09.2019
 * Time: 2:27
 */

namespace classes;


class Training
{
    /**
     * @var int
     */
    protected $id_user;
    /**
     * @var int
     */
    protected $id_composition;
    /**
     * @var string
     */
    protected $user_array;
    //---------методы Get---------------
    public function getUser()	     { return $this->id_user; }
    public function getComposition() { return $this->id_composition; }
    public function getUserArray()   { return $this->user_array; }
    //---------методы Set---------------
    public function setUser($id_user)               { $this->id_user = $id_user; }
    public function setComposition($id_composition) { $this->id_composition = $id_composition; }
    public function setUserArray($user_array)       { $this->user_array = $user_array; }
    /**
     * @var $pdo \PDO
     */
    public function updateTraining($pdo)
    {
        $stmt = $pdo->prepare("UPDATE Training SET `user_array`=:user_array WHERE `id_user`=:id_user AND `id_composition`=:id_composition");
        $stmt->execute(['user_array' => $this->user_array, 'id_user' => $this->id_user, 'id_composition' => $this->id_composition]);
    }

}

/*
 * @var $objTraining object
 */
//$objTraining = new Training();
