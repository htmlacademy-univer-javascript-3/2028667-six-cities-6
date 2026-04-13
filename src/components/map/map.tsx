import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Offer, Location } from '../../types/offer';
import './map.css';

type MapProps = {
  className: string;
  city: Location;
  offers: Offer[];
  selectedOfferId?: string;
};

const defaultCustomIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activeCustomIcon = L.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ className, city, offers, selectedOfferId }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) {
      return;
    }

    const map = L.map(mapRef.current, {
      center: [city.latitude, city.longitude],
      zoom: city.zoom,
    });

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    mapInstanceRef.current = map;
    markerLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerLayerRef.current = null;
    };
  }, [city]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    mapInstanceRef.current.setView([city.latitude, city.longitude], city.zoom);
  }, [city]);

  useEffect(() => {
    if (!markerLayerRef.current) {
      return;
    }

    markerLayerRef.current.clearLayers();

    offers.forEach((offer) => {
      L.marker(
        [offer.location.latitude, offer.location.longitude],
        {
          icon: offer.id === selectedOfferId ? activeCustomIcon : defaultCustomIcon,
        }
      ).addTo(markerLayerRef.current as L.LayerGroup);
    });
  }, [offers, selectedOfferId]);

  return <section className={`${className} map map--leaflet`} ref={mapRef}></section>;
}

export default Map;
