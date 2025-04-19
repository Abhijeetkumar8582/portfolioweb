import Document, { Html, Head, Main, NextScript } from 'next/document'




export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />  <link rel='shortcut icon' href='/Image/Abhi-Logo.svg' />
          <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
          <meta name="google-site-verification" content="Mupcmk8r3Zg80qPkYDQ9Kc7q3wfLYmBXLOTjKA5a8ik" />

        </Head>
        <body>
          <Main />

          <NextScript strategy="lazyOnload" />
          <NextScript src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" defer strategy="lazyOnload" async crossorigin="anonymous" />
          <NextScript
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossorigin="anonymous"
            defer async
            strategy="lazyOnload"
          />

          <NextScript src="https://unpkg.com/aos@2.3.1/dist/aos.js" defer async strategy="lazyOnload" />
        </body>

      </Html>
    )
  }
}
