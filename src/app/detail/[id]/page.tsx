import Image from "next/image";

import { fetchMissingPersonDetail } from "@/actions/fetch-missing-person-detail";
import { FormDetail } from "@/components/form-detail";
import { formatDate } from "@/utils";

export default async function MissingPersonDetail({
  params
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const person = await fetchMissingPersonDetail(id)
  const isPersonFound = person.ultimaOcorrencia?.dataLocalizacao

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 lg:px-0 gap-10 xl:w-3xl">
      <div className="col-span-3 flex justify-center border-b-1 border-white pb-5">
        <h1 className="text-3xl uppercase font-extrabold">Detalhes</h1>
      </div>
      <div className="col-span-2 flex flex-col">
        <span className="text-white text-md">
          <strong>Nome: </strong>
          {person.nome}
        </span>
        <span className="text-white text-md">
          <strong>Idade: </strong>
          {person.idade}
        </span>
        <span className="text-white text-md">
          <strong>Sexo: </strong>
          {person.sexo}
        </span>
        <span className="text-white text-md">
          <strong>Vestindo: </strong>
          {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido || 'Não informado'}
        </span>
        <span className="text-white text-md">
          <strong>Mais informações: </strong>
          {person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao || 'Não informado'}
        </span>
        <span className="text-white text-md">
          <strong>Local do desaparecimento: </strong>
          {person.ultimaOcorrencia?.localDesaparecimentoConcat}
        </span>
        <span className="text-white text-md">
          <strong>Data do desaparecimento: </strong>
          {formatDate(person.ultimaOcorrencia?.dtDesaparecimento)}
        </span>
      </div>
      <Image
        src={person?.urlFoto ? person.urlFoto : '/missing.jpg'}
        width={170}
        height={170}
        alt="Default image for missing persons"
        className="justify-self-end"
      />
      {
        isPersonFound ?
        <>
          <div className="col-span-3 flex justify-center border-t-1 border-white pt-5 border-b-1 pb-5">
            <h1 className="text-3xl uppercase font-extrabold">PESSOA LOCALIZADA</h1>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-md">
              <strong>Data da localização: </strong>
              {formatDate(person.ultimaOcorrencia?.dataLocalizacao)}
            </span>
            <span className="text-white text-md">
              <strong>Vivo(a)? </strong>
              {person.ultimaOcorrencia?.encontradoVivo ? 'Sim' : 'Não'}
            </span>
          </div>
        </>
        :
        (
          <FormDetail occurence={person.ultimaOcorrencia} />
        )
      }
    </div>
  );
}