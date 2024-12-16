<!DOCTYPE html>
<html>

<head>
    <title>POI Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
</head>

<body>
    <div class="input-group mt-3 mb-3">
        <input type="text" class="form-control" placeholder="Cari lokasi atau POI..." aria-label="Cari lokasi atau POI" aria-describedby="button-addon2" id="messageInput">
        <div class="input-group-append">
            <button class="btn btn-primary" type="button" id="poiSearchButton">Cari</button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div id="mapid" style="height: 600px;"></div>
        </div>
    </div>
    </div>
    <script src="script.js"></script>
</body>

</html>