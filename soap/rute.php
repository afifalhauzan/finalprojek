<?php
include 'koneksi.php';

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    // Query lokasi dari database
    $query = "SELECT * FROM informasi WHERE Nama_Lokasi IN ('Universitas Brawijaya', 'Gunung Bromo')";
    $result = $conn->query($query);

    if ($result && $result->num_rows == 2) {
        $locations = [];
        while ($row = $result->fetch_assoc()) {
            $locations[$row['Nama_Lokasi']] = $row;
        }

        // Pastikan kedua lokasi ditemukan
        if (isset($locations['Universitas Brawijaya']) && isset($locations['Gunung Bromo'])) {
            // Ambil koordinat dari lokasi
            $ubLatitude = $locations['Universitas Brawijaya']['Koordinat_Latitude'];
            $ubLongitude = $locations['Universitas Brawijaya']['Koordinat_Longitude'];
            $bromoLatitude = $locations['Gunung Bromo']['Koordinat_Latitude'];
            $bromoLongitude = $locations['Gunung Bromo']['Koordinat_Longitude'];

            // Perhitungan jarak (Haversine formula)
            $earthRadius = 6371; // dalam kilometer
            $dLat = deg2rad($bromoLatitude - $ubLatitude);
            $dLon = deg2rad($bromoLongitude - $ubLongitude);

            $a = sin($dLat / 2) * sin($dLat / 2) +
                 cos(deg2rad($ubLatitude)) * cos(deg2rad($bromoLatitude)) *
                 sin($dLon / 2) * sin($dLon / 2);
            $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
            $distance = $earthRadius * $c; // dalam kilometer

            // Respons rute
            $rute = [
                'start' => $locations['Universitas Brawijaya']['Nama_Lokasi'],
                'end' => $locations['Gunung Bromo']['Nama_Lokasi'],
                'distance' => round($distance, 2) . ' km',
                'route_description' => 'Mulai dari Universitas Brawijaya, melewati Kota Malang, menuju Gunung Bromo.'
            ];

            echo json_encode([
                'status' => 'success',
                'data' => $rute
            ]);
            exit;
        }
    }

    // Jika data lokasi tidak ditemukan
    echo json_encode([
        'status' => 'error',
        'message' => 'Data lokasi tidak ditemukan atau tidak lengkap.'
    ]);
    exit;
}

header('HTTP/1.0 405 Method Not Allowed');
echo json_encode([
    'status' => 'error',
    'message' => 'Invalid Request Method'
]);
