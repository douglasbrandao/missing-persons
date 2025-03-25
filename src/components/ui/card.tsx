import { missingPerson } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  person: missingPerson
}

export function Card({ person }: Props) {
  const isPersonFound = person.ultimaOcorrencia?.dataLocalizacao

  return (
    <Link
      href={`/detail/${person.id}`}
      className="bg-white bg-cover bg-center bg-opacity-25 bg-[url(/brasao-pc.png)] grid grid-cols-3 gap-3 rounded-md w-[300px] p-5 content-between"
    >
      <div className="flex flex-col col-span-3 items-center">
        <h2 className={`font-extrabold uppercase text-3xl ${isPersonFound ? 'text-teal-800' : 'text-red-500'}`}>
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
        <span className="text-black text-sm italic">
          <strong>Mais informações: </strong>
          {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao || 'Não informado'}
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
                {new Intl.DateTimeFormat('pt-BR').format(new Date(person.ultimaOcorrencia?.dataLocalizacao))}
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
                {new Intl.DateTimeFormat('pt-BR').format(new Date(person.ultimaOcorrencia.dtDesaparecimento))}
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
