import "./globals.css";

export const metadata = {
  title: "Tender Management Tool",
  description: "Tender Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
