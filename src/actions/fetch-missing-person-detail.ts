'use server';

import { missingPerson } from "@/types";

const BASE_URL = process.env.BASE_URL

export async function fetchMissingPersonDetail(
  id: number,
): Promise<missingPerson> {
  const data = await fetch(`${BASE_URL}/pessoas/${id}`);
  const details = await data.json();
  return details
}