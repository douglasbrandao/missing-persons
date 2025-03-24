'use server';

import { missingPerson } from "@/types";

const BASE_URL = process.env.BASE_URL

export const fetchMissingPersons = async (
  page: number = 0,
  perPage: number = 12
): Promise<missingPerson[]> => {

  try {
    const data = await fetch(`${BASE_URL}/pessoas/aberto/filtro?pagina=${page}&porPagina=${perPage}&direcao=DESC`);
    const { content: missingPersons } = await data.json();
    return missingPersons
  } catch (error) {
    console.error("Error fetching missing persons data", error)
    return []
  }
}