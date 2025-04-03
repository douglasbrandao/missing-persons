'use server';

import { MissingPerson } from "@/types";

const BASE_URL = process.env.BASE_URL

export async function fetchMissingPersonDetail(
  id: number,
): Promise<MissingPerson> {
  const data = await fetch(`${BASE_URL}/pessoas/${id}`, { cache: 'no-store'});
  const details = await data.json();
  return details
}
