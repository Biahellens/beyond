import { Stack, Typography } from "@mui/material";

// Icons
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from "react-router-dom";

export default function MenuNavigation() {
  const navigate = useNavigate()

  return (
    <Stack
      width="19rem"
      height="100vh"
      sx={{
        padding: "1rem",
        justifyContent: "space-between",
        display: "flex",
        alignItems: 'center',
        borderRight: '2px solid #D3D3D3'
      }}
    >
      <Stack sx={{
         width: "100%",
         marginTop: '5rem'
      }}>
      <Stack
        onClick={() => navigate('/mapDelivery')}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0.5rem",
          cursor: 'pointer'
        }}
      >
        <PlaceIcon />
        <Typography ml={1}>Endereços</Typography>
      </Stack>
      </Stack>
    </Stack>
  );
}
