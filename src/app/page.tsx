import { fetchMissingPersons } from "../actions/fetch-missing-persons";
import { fetchMissingAndFoundNumbers } from "../actions/fetch-missing-and-found-numbers";
import { FormFilter } from "@/components/form-filter";

export default async function Home() {
  const [missingPersons, { missingNumber, foundNumber }] = await Promise.all(
    [
      fetchMissingPersons(),
      fetchMissingAndFoundNumbers()
    ]
  );

  return (
    <>
      <div className="flex gap-3">
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">Desaparecidos: { missingNumber }</span>
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">Encontrados: { foundNumber }</span>
      </div>
      <FormFilter persons={missingPersons} />
    </>
  );
}
