import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'RR - AI Article Generator',
  description: 'Generate AI articles using Ollama Phi',
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
