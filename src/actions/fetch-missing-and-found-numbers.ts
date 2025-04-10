import { MissingAndFoundNumbers } from "@/types";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function fetchMissingAndFoundNumbers(): Promise<MissingAndFoundNumbers> {
  const data = await fetch(`${NEXT_PUBLIC_BASE_URL}/pessoas/aberto/estatistico`, { cache: 'no-store'});
  const {
    quantPessoasDesaparecidas: missingNumber,
    quantPessoasEncontradas: foundNumber
  } = await data.json();
  return { missingNumber, foundNumber }
}
