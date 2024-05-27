import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { UseMobile } from "@contexts/MobileContext";
import { Stack } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

// pages
import MapDelivery from "@pages/newAddress/NewAddress";

// Components
import Header from "@components/Header/Header";
import MenuNavigation from "@components/Menu/MenuNavigation";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/mapDelivery" />} />
        <Route path="*" element={<ProtectedRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;

function ProtectedRoutes() {
  const { isMobile } = UseMobile();

  return (
    <>
      <Stack height={isMobile ? '100%' :"100vh"} justifyContent="space-between">
        <Header />
        <Stack
          flexDirection="row"
          width="100%"
          position={isMobile ? 'relative' : "fixed"}
          top={isMobile ? 0 :"5rem"}
          height='100%'
          sx={{
            overflow: isMobile ? 'scroll' : ''
          }}
        >
          {!isMobile && <MenuNavigation />}
          <Routes>
            <Route path='/mapDelivery' element={<MapDelivery />} />
          </Routes>
        </Stack>
      </Stack>
    </>
  );
}
