import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: "#4A8DF7",
      light: "#EDF4FE",
      dark: "#1D5BD6",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 40,
          "&.Mui-disabled": {
            pointerEvents: "auto",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "26px", // MUST be a string
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === "small" && {
            height: 32,
          }),
        }),
        grouped: {
          ":first-of-type": {
            borderTopLeftRadius: 40,
            borderBottomLeftRadius: 40,
          },
          ":last-of-type": {
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: "#4A8DF7",
          },
          "&:not(.Mui-selected)": {
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          "&.MuiModal-root": {
            ":not(.date-range-modal,.full-width-dialog) >": {
              ".MuiBox-root": {
                maxWidth: "500px",
              },
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-root": {
            borderRadius: "8px",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#212125",
        },
        arrow: {
          color: "#212125",
        },
      },
    },
  },
});
