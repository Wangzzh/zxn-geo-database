import 'bootstrap/dist/css/bootstrap.css';

export const metadata = {
  title: 'ZXN Geo Database',
  description: 'ZXN Geo Database',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
