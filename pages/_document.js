import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
return (
<Html>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600&display=swap" rel="stylesheet"/>
        <meta name='description' content="Chill n Stream" />
    </Head>
    <body>
    <Main />
    <NextScript />
    </body>
</Html>
)
}