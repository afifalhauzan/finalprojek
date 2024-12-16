<?php 
// Client-side untuk RESTful API
$url = "http://localhost/finalprojek/restful/server.php";

// Request GET
$response = file_get_contents($url);
$data = json_decode($response, true);

echo "<h2>Data Lokasi:</h2>";

// Periksa apakah respons berhasil dan valid
if ($data && isset($data['data']) && is_array($data['data'])) {
    foreach ($data['data'] as $poi) {
        echo "<div>";
        echo "<p><strong>Nama Lokasi:</strong> {$poi['nama_lokasi']}</p>";
        echo "<p><strong>Deskripsi:</strong> {$poi['deskripsi']}</p>";
        echo "<p><strong>Latitude:</strong> {$poi['latitude']}, <strong>Longitude:</strong> {$poi['longitude']}</p>";
        echo "<p><strong>Rating:</strong> {$poi['rating']}</p>";
        echo "<p><strong>Kategori:</strong> {$poi['kategori']}</p>";
        echo "<p><strong>Waktu Buka:</strong> {$poi['waktu_buka']}</p>";
        echo "<p><strong>Kontak:</strong> {$poi['kontak']}</p>";
        echo "</div><hr>";
    }
} else {
    echo "<p>Tidak ada data lokasi tersedia atau terjadi kesalahan saat mengambil data.</p>";
}

// Debug untuk melihat respons dari server
echo "<pre>";
print_r($data);
echo "</pre>";
