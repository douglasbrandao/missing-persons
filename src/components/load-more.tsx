"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/ui/spinner";
import { fetchMissingPersons } from "@/actions/fetch-missing-persons";
import { Filters, MissingPerson } from "@/types";
import { delay } from "@/utils";

interface Props {
  setMissingPersons: React.Dispatch<React.SetStateAction<MissingPerson[]>>,
  filters: Filters,
}

export function LoadMore({ setMissingPersons, filters } : Props) {
  const [page, setPage] = useState(1);
  const [hasData, setHasData] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreMissingPersons = async () => {
    await delay(2000);
    const nextPage = page + 1;
    const { content: newMissingPersons } = await fetchMissingPersons(filters, nextPage)

    if (newMissingPersons.length === 0) {
      setHasData(false);
    }

    setMissingPersons((prevMissingPersons) => {
      const personIds = new Set()
      const missingPersons = [...prevMissingPersons, ...newMissingPersons]
        .filter(({ id }) => !personIds.has(id) && personIds.add(id))
      return missingPersons
    });
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView && hasData) {
      loadMoreMissingPersons();
    }
  }, [inView, hasData]);

  useEffect(() => {
    setPage(1);
    setHasData(true);
  }, [filters]);

  return (
    <>
      {
        hasData && <div
        className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3"
        ref={ref}
      >
        <Spinner />
      </div>
      }
    </>
  );
}