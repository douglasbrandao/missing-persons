'use server';

import { MissingPerson } from "@/types";

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function fetchMissingPersonDetail(
  id: number,
): Promise<MissingPerson> {
  const data = await fetch(`${NEXT_PUBLIC_BASE_URL}/pessoas/${id}`, { cache: 'no-store'});
  const details = await data.json();
  return details
}
