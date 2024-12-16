document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const locationButton = document.getElementById('locationButton');
  
    function addMessage(message, type = 'sent') {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${type}`;
      messageDiv.innerHTML = message;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    sendButton.addEventListener('click', () => {
      const message = messageInput.value.trim();
      if (message) {
        addMessage(message, 'sent');
        messageInput.value = '';
      }
    });

  // JANGAN UBAH APAPUN DISINI
    // Mengambil lokasi dari server
   // Ambil lokasi dari server RESTful dan kirimkan sebagai pesan
   locationButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost/finalprojek/restful/server.php');
        const data = await response.json();

        if (data.status === 'success' && data.data.length > 0) {
            const locationDetails = data.data[0];

            // Pesan lokasi
            const locationMessage = `📍 ${locationDetails.nama_lokasi} - (${locationDetails.latitude}, ${locationDetails.longitude})`;

            // Tambahkan pesan lokasi ke chat
            addMessage(locationMessage, 'sent');

            // Tambahkan teks "Lokasi berhasil terkirim" sebagai elemen baru
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message'; // Tambahkan class CSS untuk styling jika diperlukan
            successMessage.textContent = 'Lokasi berhasil terkirim';
            chatMessages.appendChild(successMessage);
            // khansa nambahin disini 
            const routeButton = document.createElement('button');
            routeButton.className = 'route-button';
            routeButton.textContent = 'Minta Rute';
            routeButton.addEventListener('click', async () => {
                try {
                    // Use absolute path to ensure correct API call
                    const routeResponse = await fetch('/finalprojek/soap/rute.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            latitude: locationDetails.latitude,
                            longitude: locationDetails.longitude
                        })
                    });
            
                    // Check if response is OK (HTTP status 200)
                    if (!routeResponse.ok) {
                        throw new Error(`Server responded with ${routeResponse.status} ${routeResponse.statusText}`);
                    }
            
                    // Parse response as JSON
                    const routeData = await routeResponse.json();
                    console.log('Route Data:', routeData); // Debug log for checking response
            
                    if (routeData.status === 'success') {
                        const rute = routeData.data;
                        addMessage(
                            `Rute dari ${rute.start} ke ${rute.end}:<br>` +
                            `- Jarak: ${rute.distance}<br>` +
                            `- Deskripsi: ${rute.route_description}`,
                            'info'
                        );
                    } else {
                        alert(`Gagal mendapatkan rute: ${routeData.message || 'Unknown error'}`);
                    }
                } catch (err) {
                    console.error('Fetch error:', err);
                    alert(`Error saat meminta rute: ${err.message}`);
                }
            });
            
            chatMessages.appendChild(routeButton);
            //khansa sampe sini
        } else {
            alert('No location data available');
        }
    } catch (error) {
        console.error('Error fetching data from RESTful server:', error);
        alert('Failed to fetch location');
    }
});

// SAMPAI SINI JANGAN DIUBAH
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendButton.click();
      }
    });
  });
  