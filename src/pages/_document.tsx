// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

const legacyLibrarySources = [
  '/static/assets/js/vendor/jquery-3.6.0.min.js',
  '/static/assets/js/popper.min.js',
  '/static/assets/js/bootstrap.min.js',
  '/static/assets/js/slick.min.js',
  '/static/assets/js/jquery.magnific-popup.min.js',
  '/static/assets/js/isotope.pkgd.min.js',
  '/static/assets/js/imagesloaded.pkgd.min.js',
  '/static/assets/js/jquery.nice-select.min.js',
  '/static/assets/js/jquery.counterup.min.js',
  '/static/assets/js/jquery.waypoints.js',
  '/static/assets/js/wow.min.js',
] as const;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#1975ff" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="description" content="." />
          <meta name="keywords" content="" />
          <link rel="shortcut icon" href="/static/assets/images/favicon.ico" type="image/png" />
          {/* CSS Global */}
          <link rel="stylesheet" href="/static/assets/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/assets/fonts/fontawesome/css/all.min.css" />
          <link rel="stylesheet" href="/static/assets/fonts/flaticon/flaticon.css" />
          <link rel="stylesheet" href="/static/assets/css/magnific-popup.css" />
          <link rel="stylesheet" href="/static/assets/css/slick.css" />
          <link rel="stylesheet" href="/static/assets/css/nice-select.css" />
          <link rel="stylesheet" href="/static/assets/css/animate.css" />
          <link rel="stylesheet" href="/static/assets/css/default.css" />
          <link rel="stylesheet" href="/static/assets/css/style.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />
          {legacyLibrarySources.map((src) => (
            <Script key={src} src={src} strategy="beforeInteractive" />
          ))}
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
          <a href="#" className="back-to-top"><i className="fas fa-angle-up"></i></a>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
