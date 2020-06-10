<?php

$host = 'md43.wedos.net';
$username = 'a217593_bk';
$password = '1Passtorulethem@ll';
$db_name = 'd217593_bk';
//error_reporting(0);

$db = new mysqli($host,$username,$password,$db_name);
if($db->connect_errno){
    exit('Database Connection Error:'.$db->connect_error);
}