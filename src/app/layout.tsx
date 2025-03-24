import type { Metadata } from "next";

import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "ABITUS - Pessoas desaparecidas",
  description: "Site da Polícia Civil para divulgação de pessoas desaparecidas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-between">
        <div className="flex flex-col items-center border-b-1 border-neutral-500">
          <Image
            src="/logo.png"
            alt="Logo Polícia Civil de Mato Grosso"
            className="px-8 py-[41px]"
            width={500}
            height={144}
            priority
          />
        </div>
        <main className="flex flex-col gap-5 items-center py-5 flex-1">
          {children}
        </main>
        <footer className="flex flex-col items-center gap-3 md:gap-0 md:flex-row md:justify-between py-[11px] px-10 border-t-1 border-neutral-500">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[21px]">Contato</h4>
            <span className="text-[12px]">Avenida Coronel Escolástico, 346, Bairro Bandeirantes, Cuiabá-MT. CEP: 78.010-200 - Telefone: (65) 3613-5602</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px]">Desenvolvido por</span>
            <span className="text-[11px]">Douglas Brandão</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
