"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { fetchMissingPersons } from "@/actions/fetch-missing-persons";
import { missingPerson } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function LoadMore() {
  const [missingPersons, setMissingPersons] = useState<missingPerson[]>([]);
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();

  const loadMoreMissingPersons = async () => {
    await delay(2000);
    const nextPage = page + 1;
    const newMissingPersons = await fetchMissingPersons(nextPage)
    setMissingPersons((prevMissingPersons: missingPerson[]) => [...prevMissingPersons, ...newMissingPersons]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreMissingPersons();
    }
  }, [inView]);

  return (
    <>
      {missingPersons.map((person) => (
          <Card key={person.id} person={person} />
      ))}
      <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
}