import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import CookieConsentBanner from "@/pages/legal/components/CookieConsentBanner";
import { AuthProvider } from "@/contexts/AuthContext";
import ErrorBoundary from "@/components/feature/ErrorBoundary";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <AuthProvider>
          <BrowserRouter basename={__BASE_PATH__}>
            <AppRoutes />
            <CookieConsentBanner />
          </BrowserRouter>
        </AuthProvider>
      </ErrorBoundary>
    </I18nextProvider>
  );
}

export default App;