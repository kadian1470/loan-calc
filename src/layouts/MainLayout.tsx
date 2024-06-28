import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";
import useScreenView, { mobileShouldCallback } from "../utils/mobile";

const MainContainer = styled("div")`
  display: flex;
  align-self: start;
  justify-content: start;
  flex-direction: column;
  max-height: 100%;
  flex: 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Header = styled(Box, {
  shouldForwardProp: mobileShouldCallback,
})<{ isMobile: boolean }>(({ theme, isMobile }) => ({
  display: "flex",
  margin: isMobile ? theme.spacing(2.25, 1) : theme.spacing(2.5, 0),
  justifyContent: "space-between",
  minHeight: "46px",
}));

const LeftPanel = styled(Box)`
  display: flex;
  flex: 1;F
  align-items: center;
`;

export const PageHeaderButtons = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing(2)};
  height: ${theme.spacing(4)};
`
);

export type MainLayoutProps = Readonly<{
  /**
   * Title of the page.
   */
  title: string;
  /**
   * Optional, Component to be added to the top right of the page.
   */
  rightPanel?: ReactNode;
  /**
   * Component that will fill the lower portion of the page under the header.
   */
  children: ReactNode;
}>;

export default function MainLayout({
  title,
  rightPanel,
  children,
}: MainLayoutProps) {
  const { isMobile } = useScreenView();
  return (
    <MainContainer>
      <Header isMobile={isMobile}>
        <LeftPanel>
          <Typography>{title}</Typography>
        </LeftPanel>
        <PageHeaderButtons>{rightPanel}</PageHeaderButtons>
      </Header>
      {children}
    </MainContainer>
  );
}
