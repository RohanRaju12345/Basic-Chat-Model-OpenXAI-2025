import '../styles/globals.css';

export const metadata = {
  title: 'RR - AI Article Generator',
  description: 'Generate AI articles using Ollama + Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
