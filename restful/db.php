<?php
// Definisi koneksi database
define('DB_SERVER', 'localhost'); // Ganti dengan server database Anda jika diperlukan
define('DB_USERNAME', 'root');    // Ganti dengan username database Anda
define('DB_PASSWORD', '');        // Ganti dengan password database Anda
define('DB_NAME', 'dbchat');         // Ganti dengan nama database Anda

// Membuat koneksi ke database dengan Mysqli
$connection = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Periksa koneksi database
if ($connection->connect_error) {
    die("Koneksi Gagal: " . $connection->connect_error);
}
?>
