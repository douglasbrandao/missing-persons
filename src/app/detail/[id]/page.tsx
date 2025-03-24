import Image from "next/image";

import { fetchMissingPersonDetail } from "@/actions/fetch-missing-person-detail";

export default async function missingPersonDetail({
  params
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const person = await fetchMissingPersonDetail(id)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
          <strong>Está vivo? </strong>
          {person.sexo ? 'Sim' : 'Não'}
        </span>
        <span className="text-white text-md">
          <strong>Local do desaparecimento: </strong>
          {person.ultimaOcorrencia?.localDesaparecimentoConcat}
        </span>
        <span className="text-white text-md">
          <strong>Data do desaparecimento: </strong>
          {new Intl.DateTimeFormat('pt-BR').format(new Date(person.ultimaOcorrencia?.dtDesaparecimento))}
        </span>
      </div>
      <Image
        src="/missing.jpg"
        width={170}
        height={170}
        alt="Default image for missing persons"
        className="justify-self-end"
      />
    </div>
  );
}