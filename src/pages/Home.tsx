import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import useScreenView, { mobileShouldCallback } from "../utils/mobile";

const Container = styled(Box, {
  shouldForwardProp: mobileShouldCallback,
})<{ isMobile: boolean }>(
  ({ isMobile }) => `
  height: 100vh;
  display: flex;
  width: 100%;
  flex-direction: ${isMobile ? "column-reverse" : "row"}
`
);

const MainPanel = styled("div", {
  shouldForwardProp: (prop: string) =>
    !["isMobile", "hasCompany"].includes(prop),
})<{ isMobile: boolean }>(
  ({ theme, isMobile }) => `
  display: flex;
  align-self: center;
  justify-content: center;
  width: 100%;
  height: ${isMobile ? `calc(100vh - 56px)` : "100vh"};
  background-color: ${theme.palette.grey[100]};
  overflow-y: auto;
  margin: 8px;
`
);

export default function Home() {
  const { isMobile } = useScreenView();
  return (
    <Container isMobile={isMobile}>
      <Box display="flex" width="100%" flexDirection="column">
        <MainPanel isMobile={isMobile}>
          <Outlet />
        </MainPanel>
      </Box>
    </Container>
  );
}
