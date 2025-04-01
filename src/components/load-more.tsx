"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { fetchMissingPersons } from "@/actions/fetch-missing-persons";
import { Filters, missingPerson } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Props {
  missingPersons: missingPerson[],
  setMissingPersons: React.Dispatch<React.SetStateAction<missingPerson[]>>,
  filters: Filters,
}

export function LoadMore({ missingPersons, setMissingPersons, filters } : Props) {
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const loadMoreMissingPersons = async () => {
    await delay(2000);
    const nextPage = page + 1;
    const newMissingPersons = await fetchMissingPersons(filters, nextPage)
    setMissingPersons((prevMissingPersons) => {
      const personIds = new Set()
      const missingPersons = [...prevMissingPersons, ...newMissingPersons]
        .filter(({ id }) => !personIds.has(id) && personIds.add(id))
      return missingPersons
    });
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreMissingPersons();
    }
  }, [inView]);

  return (
    <>
      {
        missingPersons && missingPersons.map((person) => (
          <Card key={person.id} person={person} />
        ))
      }
      {
        missingPersons && <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
      }
    </>
  );
}