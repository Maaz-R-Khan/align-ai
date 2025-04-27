import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/system";
import { Theme } from "@radix-ui/themes"; // Radix Themes
import "@radix-ui/themes/styles.css";     // Radix Themes CSS

export default function App({ Component, pageProps }) {
  return    <HeroUIProvider>
  <Theme appearance="dark"> {/* You can configure light/dark here */}
    <Component {...pageProps} />
  </Theme>
</HeroUIProvider>
}
