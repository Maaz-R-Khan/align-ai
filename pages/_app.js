import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/system";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { AuthProvider } from "@/context/AuthContext"; 

export default function App({ Component, pageProps }) {
  return (
    <HeroUIProvider>
      <Theme appearance="dark">
        <AuthProvider> {}
          <Component {...pageProps} />
        </AuthProvider>
      </Theme>
    </HeroUIProvider>
  );
}
