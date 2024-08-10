let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    });
    marker = new google.maps.Marker({
        map: map,
    });

    // Fetch location data periodically
    setInterval(async () => {
        const response = await fetch('/location');
        const data = await response.json();
        if (data.latitude && data.longitude) {
            const newPosition = { lat: data.latitude, lng: data.longitude };
            map.setCenter(newPosition);
            marker.setPosition(newPosition);
        }
    }, 5000); // Update every 5 seconds
}

window.onload = initMap;
