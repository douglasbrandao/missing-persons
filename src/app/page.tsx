import Card from "@/components/ui/card";
import { missingAndFoundNumbers, missingPerson } from "@/types";

const BASE_URL = process.env.BASE_URL

const getMissingPersons = async (
  page: number = 0,
  perPage: number = 10
): Promise<missingPerson[]> => {
  const data = await fetch(`${BASE_URL}/pessoas/aberto/filtro?pagina=${page}&porPagina=${perPage}&direcao=DESC`);
  const { content: missingPersons } = await data.json();
  return missingPersons
}

const getMissingAndFoundNumbers = async (): Promise<missingAndFoundNumbers> => {
  const data = await fetch(`${BASE_URL}/pessoas/aberto/estatistico`);
  const {
    quantPessoasDesaparecidas: missingNumber,
    quantPessoasEncontradas: foundNumber
  } = await data.json();
  return { missingNumber, foundNumber }
}

export default async function Home() {
  const [missingPersons, { missingNumber, foundNumber }] = await Promise.all(
    [
      getMissingPersons(),
      getMissingAndFoundNumbers()
    ]
  );

  return (
    <>
      <div className="flex gap-3">
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Desaparecidos: { missingNumber }</span>
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">Encontrados: { foundNumber }</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {missingPersons.map((person) => (
          <Card key={person.id} person={person} />
        ))}
      </div>
    </>
  );
}
