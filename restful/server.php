<?php
require_once 'db.php'; // Sertakan file koneksi database

header('Content-Type: application/json');

try {
    // Jalankan query dengan koneksi yang ada
    $query = "SELECT Koordinat_Latitude, Koordinat_Longitude, Nama_Lokasi, Deskripsi_Lokasi, Rating, Kategori, Waktu_Buka, Kontak_Lokasi FROM informasi";
    $result = $connection->query($query);

    if (!$result) {
        throw new Exception("Query gagal: " . $connection->error);
    }

    $locations = [];
    
    while ($row = $result->fetch_assoc()) {
        $locations[] = [
            "latitude" => $row['Koordinat_Latitude'],
            "longitude" => $row['Koordinat_Longitude'],
            "nama_lokasi" => $row['Nama_Lokasi'],
            "deskripsi" => $row['Deskripsi_Lokasi'],
            "rating" => $row['Rating'],
            "kategori" => $row['Kategori'],
            "waktu_buka" => $row['Waktu_Buka'],
            "kontak" => $row['Kontak_Lokasi']
        ];
    }

    echo json_encode([
        "status" => "success",
        "data" => $locations
    ]);

    $connection->close();
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>
