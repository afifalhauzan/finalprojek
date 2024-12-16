document.addEventListener('DOMContentLoaded', function() {
    // JANGAN UBAH APAPUN DISINI KALAU MAU TAMBAH BISA DI PALING BAWAH
    fetch('read.php')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Debug: Periksa data yang dikembalikan oleh read.php
        if (data.length > 0) {
            var mymap = L.map('mapid').setView([data[0]['Koordinat_Latitude'], data[0]['Koordinat_Longitude']], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(mymap);

            for (var i = 0; i < data.length; i++) {
                var location = new L.LatLng(data[i]['Koordinat_Latitude'], data[i]['Koordinat_Longitude']);
                var marker = L.marker([data[i]['Koordinat_Latitude'], data[i]['Koordinat_Longitude']]).addTo(mymap);
                marker.bindPopup("<b>Latitude:</b> " + data[i]['Koordinat_Latitude'] + 
                "<br><b>Longitude:</b> " + data[i]['Koordinat_Longitude'] +
                "<br><b>Nama Lokasi:</b> " + data[i]['Nama_Lokasi'] +
                "<br><b>Deskripsi:</b> " + data[i]['Deskripsi_Lokasi'] +
                "<br><b>Rating:</b> " + data[i]['Rating'] +
                "<br><b>Kategori:</b> " + data[i]['Kategori'] +
                "<br><b>Waktu Buka:</b> " + data[i]['Waktu_Buka'] +
                "<br><b>Kontak:</b> " + data[i]['Kontak_Lokasi'] +
                "<br><b>Status:</b> " + data[i]['status']).openPopup();
            }
        }
        
    })
    .catch(error => console.error(error));
});
