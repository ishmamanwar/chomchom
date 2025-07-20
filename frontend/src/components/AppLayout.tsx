import Header from "./Header";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="centered-layout">
        <div className="content-container">{children}</div>
      </main>
    </>
  );
}
