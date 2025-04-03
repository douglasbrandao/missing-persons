import { MissingAndFoundNumbers } from "@/types";

const BASE_URL = process.env.BASE_URL

export async function fetchMissingAndFoundNumbers(): Promise<MissingAndFoundNumbers> {
  const data = await fetch(`${BASE_URL}/pessoas/aberto/estatistico`, { cache: 'no-store'});
  const {
    quantPessoasDesaparecidas: missingNumber,
    quantPessoasEncontradas: foundNumber
  } = await data.json();
  return { missingNumber, foundNumber }
}
