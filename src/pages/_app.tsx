import React from 'react';
import type { AppProps } from "next/app";
import { HelmetProvider } from "react-helmet-async";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import BaseLayout from "@/layouts/BaseLayout";
import LegacyScripts from '@/components/LegacyScripts';

import 'dayjs/locale/es';
import WhatsAppButton from '@/components/WhatsAppButton';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="es"
        >
          <WhatsAppButton />
          <BaseLayout isLoggedIn={Boolean(pageProps.isLoggedIn)}>
            <Component {...pageProps} />
          </BaseLayout>
          <LegacyScripts />
        </LocalizationProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export default MyApp;
