document.addEventListener('DOMContentLoaded', function () {
    let wisataData = []; // Variabel untuk menyimpan lokasi wisata

    fetch('read.php')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debug: Cek data yang diterima dari read.php
            if (data.length > 0) {
                // Inisialisasi peta
                var mymap = L.map('mapid').setView([data[0]['Koordinat_Latitude'], data[0]['Koordinat_Longitude']], 13);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(mymap);
                
                // Ambil parameter pencarian dari URL
                const urlParams = new URLSearchParams(window.location.search);
                const searchQuery = urlParams.get('search');
                
                
                // Iterasi data dari read.php
                for (var i = 0; i < data.length; i++) {
                    // Filter jika kata kunci 'wisata' ada di parameter pencarian
                    if (searchQuery && searchQuery.toLowerCase() === 'wisata') {
                        if (data[i]['Kategori'] && data[i]['Kategori'].toLowerCase().includes('wisata')) {
                            wisataData.push(data[i]); // Simpan lokasi wisata
                        }
                    } else {
                        // Tampilkan semua data jika tidak ada filter
                        addMarker(mymap, data[i]);
                    }
                }
                
                // Tampilkan hanya data wisata jika ada keyword 'wisata'
                if (searchQuery && searchQuery.toLowerCase() === 'wisata' && wisataData.length > 0) {
                    wisataData.forEach(item => addMarker(mymap, item));
                    
                    // Tambahkan daftar wisata di bawah peta
                    displayWisataList(wisataData);
                } else if (searchQuery && searchQuery.toLowerCase() === 'wisata') {
                    alert('Tidak ada lokasi wisata yang ditemukan.');
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    
    // Fungsi untuk menambahkan marker ke peta
    function addMarker(map, locationData) {
        var marker = L.marker([locationData['Koordinat_Latitude'], locationData['Koordinat_Longitude']]).addTo(map);
        marker.bindPopup(
            "<b>Latitude:</b> " + locationData['Koordinat_Latitude'] +
            "<br><b>Longitude:</b> " + locationData['Koordinat_Longitude'] +
            "<br><b>Nama Lokasi:</b> " + locationData['Nama_Lokasi'] +
            "<br><b>Deskripsi:</b> " + locationData['Deskripsi_Lokasi'] +
            "<br><b>Rating:</b> " + locationData['Rating'] +
            "<br><b>Kategori:</b> " + locationData['Kategori'] +
            "<br><b>Waktu Buka:</b> " + locationData['Waktu_Buka'] +
            "<br><b>Kontak:</b> " + locationData['Kontak_Lokasi'] +
            "<br><b>Status:</b> " + locationData['status']
        );
    }
    
    // Fungsi untuk menampilkan daftar wisata
    function displayWisataList(wisataData) {
        // Buat kontainer untuk daftar wisata
        const listContainer = document.createElement('div');
        listContainer.id = 'wisata-list';
        listContainer.className = 'wisata-list-container';
        listContainer.innerHTML = '<h2>Daftar Lokasi Wisata</h2>';
        
        // Buat tabel untuk daftar wisata
        const table = document.createElement('table');
        table.className = 'wisata-list-table';
        
        // Buat header tabel
        const headerRow = table.insertRow();
        const headers = ['Nama Lokasi', 'Deskripsi', 'Rating', 'Waktu Buka', 'Kontak'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        // Tambahkan baris untuk setiap lokasi wisata
        wisataData.forEach(item => {
            const row = table.insertRow();
            
            // Nama Lokasi
            const namaCell = row.insertCell();
            namaCell.textContent = item['Nama_Lokasi'] || 'Tidak tersedia';
            
            // Deskripsi
            const deskripsiCell = row.insertCell();
            deskripsiCell.textContent = item['Deskripsi_Lokasi'] || 'Tidak tersedia';
            
            // Rating
            const ratingCell = row.insertCell();
            ratingCell.textContent = item['Rating'] || 'Tidak tersedia';
            
            // Waktu Buka
            const waktuCell = row.insertCell();
            waktuCell.textContent = item['Waktu_Buka'] || 'Tidak tersedia';
            
            // Kontak
            const kontakCell = row.insertCell();
            kontakCell.textContent = item['Kontak_Lokasi'] || 'Tidak tersedia';
        });
        
        // Tambahkan tabel ke kontainer
        listContainer.appendChild(table);
        
        // Tambahkan kontainer ke halaman, tepat di bawah peta
        const mapContainer = document.getElementById('mapid');
        mapContainer.insertAdjacentElement('afterend', listContainer);
        
        // Tambahkan CSS untuk styling
        const style = document.createElement('style');
        style.textContent = `
            .wisata-list-container {
                margin-top: 20px;
                padding: 15px;
                background-color: #f4f4f4;
            }
            .wisata-list-table {
                width: 100%;
                border-collapse: collapse;
            }
            .wisata-list-table th, .wisata-list-table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            .wisata-list-table th {
                background-color: #f2f2f2;
            }
        `;
        document.head.appendChild(style);
    }
    
    // TAMBAHAN: Redirect pencarian POI
    document.getElementById('poiSearchButton').addEventListener('click', () => {
        const searchQuery = document.getElementById('messageInput').value.trim();
        if (searchQuery) {
            // Redirect to the search page with the search query parameter
            window.location.href = `?search=${encodeURIComponent(searchQuery)}`;
        } else {
            alert('Masukkan kata kunci pencarian!');
        }
    });
    
    // Ambil parameter pencarian dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery && searchQuery.toLowerCase() === 'wisata') {
        // Panggil fungsi untuk menampilkan daftar wisata
        displayWisataList(wisataData);
    } else {
        // Panggil fungsi untuk menampilkan semua data
        displayAllData(data);
    }
});