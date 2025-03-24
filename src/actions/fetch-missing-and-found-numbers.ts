import { missingAndFoundNumbers } from "@/types";

const BASE_URL = process.env.BASE_URL

export const fetchMissingAndFoundNumbers = async (): Promise<missingAndFoundNumbers> => {
  const data = await fetch(`${BASE_URL}/pessoas/aberto/estatistico`);
  const {
    quantPessoasDesaparecidas: missingNumber,
    quantPessoasEncontradas: foundNumber
  } = await data.json();
  return { missingNumber, foundNumber }
}