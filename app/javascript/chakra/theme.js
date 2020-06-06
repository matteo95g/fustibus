import { theme } from "@chakra-ui/core";

const breakpoints = ["0px", "600px", "960px", "1280px", "1920px"];
breakpoints.xs = breakpoints[0];
breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
breakpoints.xl = breakpoints[4];

const customTheme = {
  ...theme,
  breakpoints: breakpoints,
};

export default customTheme;
