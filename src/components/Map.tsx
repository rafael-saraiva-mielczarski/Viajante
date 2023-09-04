import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { CityInterface } from "../types/CityInterface";
import { flagemojiToPNG } from "../utils/flagEmojiToPng";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

import styles from "./Map.module.css";
import Button from "./Button";

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<number[]>([40, 0]);
  const [searchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPos,
    getPosition,
  } = useGeolocation();

  const mapLat: any = searchParams.get("lat");
  const mapLng: any = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPos)
      setMapPosition([geolocationPos.lat, geolocationPos.lng]);
  }, [geolocationPos]);

  return (
    <div className={styles.mapContainer}>
      {geolocationPos.lat === -12 && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Carregando..." : "sua localização"}
        </Button>
      )}
      <MapContainer
        center={[mapPosition[0], mapPosition[1]]}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          noWrap={true}
        />
        {cities.map((city: CityInterface) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: any) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent("click", (e) =>
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  );
  return null;
}
