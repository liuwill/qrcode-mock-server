import Document, { Head, Main, NextScript } from 'next/document'
import CommonStyle from '../styles/common.scss'

class MyDocument extends Document {
  render() {
    const { nextStyle } = this.props;

    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <link rel='stylesheet' href='/static/styles/semantic.min.css' />
          <link rel='stylesheet' href='/static/assets/bundle.css' />
          {/* <style dangerouslySetInnerHTML={{ __html: CommonStyle }} /> */}
        </Head>
        <body className={CommonStyle['demo-body']}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }

  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()

    return { html, head, errorHtml, chunks }
  }
}

export default MyDocument;
