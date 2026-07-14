import './globals.css';

export const metadata = {
  title: 'WishFlow | Celebrate your people',
  description: 'Thoughtful employee birthday celebrations, on autopilot.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
