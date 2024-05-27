import { UseMobile } from "@contexts/MobileContext";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useState } from "react";
import './style.css'

// Icons
import icon_climagro from "@assets/icon_climagro.svg";
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isMobile } = UseMobile();
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Stack
        onClick={toggleDrawer(true)}
        width="100vw"
        height="5rem"
        sx={{
          background: "#008B8B",
          padding: "2rem",
          top: 0,
          position: isMobile ? '' : "fixed",
          justifyContent: isMobile ? "center" : "end",
          display: "flex",
          alignItems: isMobile ? "center" : "end",
          flexDirection: 'row'
        }}
      >
        <Typography ml={1}>DellBeyond</Typography>
        <PlaceIcon />
      </Stack>
      {isMobile &&
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box role="presentation" onClick={toggleDrawer(false)}>
            <Stack
              sx={{
                width: "100%",
              }}
            >
              <Stack
                onClick={() => navigate('/mapDelivery')}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                <PlaceIcon />
                <Typography ml={1}>Endereços</Typography>
              </Stack>
            </Stack>
          </Box>
        </Drawer>
      }
    </>
  );
}
