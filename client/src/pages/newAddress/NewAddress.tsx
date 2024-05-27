import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Modal, Stack, TextField, Button, Typography } from "@mui/material";

interface MarkerData {
  id: number;
  position: [number, number];
  name: string;
}

export default function MapDelivery() {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newMarkerName, setNewMarkerName] = useState<string>("");
  const [newMarkerPosition, setNewMarkerPosition] = useState<
    [number, number] | null
  >(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  useEffect(() => {
    const storedMarkers = localStorage.getItem("markers");
    if (storedMarkers) {
      setMarkers(JSON.parse(storedMarkers));
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMarker(null);
  };

  const handleShowModal = () => setShowModal(true);

  const handleCreateMarker = () => {
    if (newMarkerPosition && newMarkerName.trim() !== "") {
      const newMarker: MarkerData = {
        id: markers.length + 1,
        name: newMarkerName.trim(),
        position: newMarkerPosition,
      };
      setMarkers([...markers, newMarker]);
      localStorage.setItem("markers", JSON.stringify([...markers, newMarker]));
      setNewMarkerName("");
      setNewMarkerPosition(null);
      setShowModal(false);
    }
  };

  const handleMapClick = (e: any) => {
    setNewMarkerPosition([e.latlng.lat, e.latlng.lng]);
    setLatitude(String(e.latlng.lat));
    setLongitude(String(e.latlng.lng));
    handleShowModal();
  };

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
    setLatitude(String(marker.position[0]));
    setLongitude(String(marker.position[1]));
    handleShowModal();
  };

  const handleEditMarker = () => {
    if (selectedMarker && newMarkerName.trim() !== "") {
      const updatedMarker: MarkerData = {
        ...selectedMarker,
        name: newMarkerName.trim(),
      };
      const updatedMarkers = markers.map((marker) =>
        marker.id === selectedMarker.id ? updatedMarker : marker
      );
      setMarkers(updatedMarkers);
      localStorage.setItem("markers", JSON.stringify(updatedMarkers));
      setNewMarkerName("");
      setShowModal(false);
    }
  };

  // Componente para alterar o centro do mapa
  const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({
    center,
    zoom,
  }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  // Componente para manipular o clique no mapa
  const MapClickHandler: React.FC<{ addMarker: (e: any) => void }> = ({
    addMarker,
  }) => {
    const map = useMap();
    map.on("click", (e: any) => {
      addMarker(e);
    });
    return null;
  };

  return (
    <Stack width="100%" sx={{ margin: 0, padding: 0 }}>
      <MapContainer style={{ height: "400px", width: "100vw" }}>
        <ChangeView center={[51.505, -0.09]} zoom={13} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            eventHandlers={{ click: () => handleMarkerClick(marker) }}
          >
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
        <MapClickHandler addMarker={handleMapClick} />
      </MapContainer>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Stack
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
            width: '400px'
          }}
        >
          <Stack spacing={2}>
            <Stack mb={1}>
              <Typography sx={{ marginBottom: '0.5rem' }}>Nome do marcador:</Typography>
              <TextField
                variant="outlined"
                value={selectedMarker ? selectedMarker.name : newMarkerName}
                onChange={(e) => setNewMarkerName(e.target.value)}
              />
            </Stack>
            <Stack mb={1}>
              <Typography sx={{ marginBottom: '0.5rem' }}>Latitude:</Typography>
            <TextField
              variant="outlined"
              value={selectedMarker ? selectedMarker.position[0] : latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            </Stack>
            <Stack>
            <Typography sx={{ marginBottom: '0.5rem' }}>Longitude:</Typography>
              <TextField
                variant="outlined"
                value={selectedMarker ? selectedMarker.position[1] : longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </Stack>

            <Button
              variant="contained"
              onClick={selectedMarker ? handleEditMarker : handleCreateMarker}
              sx={{
                background: "#20B2AA",
                border: "#20B2AA",
                color: '#FFFFFF',
                "&:hover": {
                  background: "transparent",
                  border: "#20B2AA",
                  color: '#20B2AA'
                }
              }}
            >
              {selectedMarker ? "Editar" : "Criar"}
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}
