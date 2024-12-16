<?php
include 'koneksi.php';

// INI AKU PAKE TABEL NAMANYA INFORMASI, KALIAN BISA SESUAIKAN
$sql = "SELECT * FROM informasi";
$result = $conn->query($sql);

$data = array();
while($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>
