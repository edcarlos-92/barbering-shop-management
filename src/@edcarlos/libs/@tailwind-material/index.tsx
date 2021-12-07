import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "../../../../tailwind.config";

const {
  Button,
  MuiThemeProvider,
  createMuiTheme,
} = require("@material-ui/core");

const tailwindConfig = resolveConfig(tailwindConfigModule);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: tailwindConfig.theme.colors.primary.main,
    },
  },
});

export function Index() {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <h1>Welcome!</h1>

        <p>This is my MUI Tailwind website!</p>

        <div>
          <Button variant="contained" color="primary">
            See more here
          </Button>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
