'use server';

import { MissingPersonsResponse } from "@/types";

const BASE_URL = process.env.BASE_URL

export async function fetchMissingPersons(
  filters = {},
  page: number = 0,
  perPage: number = 12
): Promise<MissingPersonsResponse> {
  const response = await fetch(`${BASE_URL}/pessoas/aberto/filtro?${new URLSearchParams(filters).toString()}&pagina=${page}&porPagina=${perPage}&direcao=DESC`, {
    cache: 'no-store'
  });
  const data = await response.json();
  return data
}
