
import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function useScreenView() {
  const isMobile = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down("sm");
  });

  const isDesktop = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.up("sm");
  });
  return {
    isDesktop,
    isMobile,
  };
}
export const mobileShouldCallback = (prop: string) => prop !== "isMobile";
