import Script from 'next/script';

export default function LegacyScripts() {
  return <Script src="/static/assets/js/main.js" strategy="afterInteractive" />;
}
