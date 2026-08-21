import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Tender Management Tool",
  description: "Tender Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Sidebar />

          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
