// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// locales
import ThemeLocalization from "./locales";
// components
import SnackbarProvider from "./components/snackbar";
import { ThemeSettings } from "./components/settings";
import { MotionLazyContainer } from "./components/animate";
import AutoLogout from "./components/customFunctions/AutoLogout";
import Notification from "./notification";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <AutoLogout>
          <ThemeSettings>
            <ThemeLocalization>
              <SnackbarProvider>
                <Router />
                <Notification />
              </SnackbarProvider>
            </ThemeLocalization>
          </ThemeSettings>
        </AutoLogout>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
