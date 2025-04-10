import { MissingPerson } from "@/types";
import { formatDate } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  person: MissingPerson
}

export function Card({ person }: Props) {
  const isPersonFound = person.ultimaOcorrencia?.dataLocalizacao

  return (
    <Link
      href={`/detail/${person.id}`}
      className="bg-white bg-cover bg-center bg-opacity-25 bg-[url(/brasao-pc.png)] grid grid-cols-3 gap-3 rounded-md p-5 content-between"
    >
      <div className="flex flex-col col-span-3 items-center">
        <h2 className={`font-extrabold uppercase text-3xl md:text-2xl lg:text-3xl ${isPersonFound ? 'text-teal-800' : 'text-red-500'}`}>
          {isPersonFound ? 'Encontrado' : 'Desaparecido'}
        </h2>
        <h6 className={`font-bold uppercase text-base text-center ${isPersonFound ? 'text-teal-800' : 'text-red-500'}`}>{person.nome}</h6>
        <div className={`border-1 w-full ${isPersonFound ? 'border-teal-800' : 'border-red-500'}`}></div>
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
        <span className="text-black text-sm text">
          <strong>Vestindo: </strong>
          {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || 'Não informado'}
        </span>
      </div>
      <div className="flex flex-col gap-1">
          {/* Coloquei um avatar default por que as URLS estão vindo quebradas na API */}
          <Image
            src={person.urlFoto ? person.urlFoto : '/missing.jpg'}
            width={128}
            height={128}
            alt="Avatar"
            className="border-2 border-black object-center aspect-square"
            unoptimized
          />
        {
          isPersonFound ?
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-black">Última ocorrência</span>
              <span className="text-xs text-black truncate">
                <strong>Vivo? </strong>
                {person.ultimaOcorrencia?.encontradoVivo ? 'Sim' : 'Não'}
              </span>
              <span className="text-xs text-black">
                <strong>Data: </strong>
                {formatDate(person.ultimaOcorrencia.dataLocalizacao)}
              </span>
            </div>
          :
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-black">Última vez visto</span>
              <span className="text-xs text-black truncate">
                <strong>Local: </strong>
                {person.ultimaOcorrencia?.localDesaparecimentoConcat}
              </span>
              <span className="text-xs text-black">
                <strong>Data: </strong>
                {formatDate(person.ultimaOcorrencia.dtDesaparecimento)}
              </span>
            </div>
        }
      </div>
      <div className="col-span-3">
        {
          isPersonFound ?
          <p className="text-sm text-black">
            Esta pessoa já foi localizada, mas ainda há muitos desaparecidos. Se você tem qualquer informação sobre o paradeiro de alguém que continua desaparecido, entre em contato imediatamente com a Polícia Civil de Mato Grosso pelo telefone <strong>(65) 3613-5602</strong>.
          </p>
          :
          <p className="text-sm text-black">
            Se você tem qualquer informação sobre o paradeiro desta pessoa, entre em contato imediatamente com a Polícia Civil de Mato Grosso pelo telefone <strong>(65) 3613-5602</strong>.
          </p>
         }
      </div>
    </Link>
  );
}
