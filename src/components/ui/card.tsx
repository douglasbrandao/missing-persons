import { missingPerson } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  person: missingPerson
}

export default async function Card({ person }: Props) {
  return (
    <div className="bg-white bg-cover bg-center bg-opacity-25 bg-[url(/brasao-pc.png)] grid grid-cols-3 gap-3 rounded-md w-[300px] p-5 content-between">
      <div className="flex flex-col col-span-3 items-center">
        <h2 className="font-extrabold uppercase text-3xl text-red-500">Desaparecido</h2>
        <h6 className="font-bold uppercase text-base text-red-500">{person.nome}</h6>
        <div className="border-1 w-full border-red-500"></div>
      </div>
      <div className="col-span-2 flex flex-col">
        <span className="text-black text-sm">
          <strong>Idade: </strong>
          {person.idade}
        </span>
        <span className="text-black text-sm">
          <strong>Sexo: </strong>
          {person.sexo}
        </span>
        <span className="text-black text-sm">
          <strong>Vestindo: </strong>
          {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || 'Não informado'}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="border-2 border-black">
          {/* Coloquei um avatar default por que as URLS estão vindo quebradas na API */}
          <Image
            src="/missing.jpg"
            width={128}
            height={128}
            alt="Default image for missing persons"
          />
        </div>
        <div>
          <p className="font-semibold text-sm text-black">Última vez visto</p>
          <p className="text-xs text-black truncate">
            <strong>Local: </strong>
            {person.ultimaOcorrencia?.localDesaparecimentoConcat}
          </p>
          <p className="text-xs text-black">
            <strong>Data: </strong>
            {new Intl.DateTimeFormat('pt-BR').format(new Date(person.ultimaOcorrencia.dtDesaparecimento))}
          </p>
        </div>
      </div>
      <div className="col-span-3">
        <p className="text-sm text-black">
          Se você tem qualquer informação sobre o paradeiro desta pessoa, entre em contato imediatamente com a Polícia Civil de Mato Grosso pelo telefone <strong>(65) 3613-5602</strong>.
        </p>
      </div>
    </div>
  );
}
