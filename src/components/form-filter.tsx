'use client'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Filters, missingPerson } from "@/types";
import { LoadMore } from "./load-more";
import { Card } from "./ui/card";
import { fetchMissingPersons } from "@/actions/fetch-missing-persons";

const schema = z.object({
  name: z.string().optional(),
  sex: z.enum(["FEMININO", "MASCULINO", ""], {
    message: "Sexo inválido",
  }).optional(),
  minAge: z.string().optional(),
  maxAge: z.string().optional(),
  status: z.enum(["DESAPARECIDO", "LOCALIZADO", ""], {
    message: "Status inválido",
  }).optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  persons: missingPerson[]
}

export function FormFilter({ persons }: Props) {
  const [filters, setFilters] = useState<Filters>({})
  const [missingPersons, setMissingPersons] = useState<missingPerson[]>(persons)

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
    }
  } = useForm<FormData>({
      resolver: zodResolver(schema)
  });

  async function onSubmit(data: FormData) {
    const filters = {
      nome: data.name,
      sexo: data.sex,
      faixaIdadeInicial: data.minAge,
      faixaIdadeFinal: data.maxAge,
      status: data.status,
    }
    const response = await fetchMissingPersons(filters)
    setFilters(filters)
    setMissingPersons(response);
  };

  return (
    <>
      <form
        className="col-span-3 flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row md:items-stretch gap-2">
          <input type="text" id="name" className="text-gray-400 border-1 border-gray-800 rounded p-2" {...register('name')} placeholder="Nome" />
          <select
            id="sex"
            defaultValue=""
            className="text-gray-400 border-1 border-gray-800 rounded p-2"
            {...register('sex')}
          >
            <option value="">Sexo</option>
            <option value="FEMININO">Feminino</option>
            <option value="MASCULINO">Masculino</option>
          </select>
          <input type="number" id="min-age" min="0" className="text-gray-400 border-1 border-gray-800 rounded p-2"{...register('minAge')} placeholder="Idade mínima" />
          <input type="number" id="max-age" min="0" className="text-gray-400 border-1 border-gray-800 rounded p-2"{...register('maxAge')} placeholder="Idade máxima"/>
          <select
            id="sex"
            defaultValue=""
            className="text-gray-400 border-1 border-gray-800 rounded p-2"
            {...register('status')}
          >
            <option value="">Status</option>
            <option value="DESAPARECIDO">Desaparecido</option>
            <option value="LOCALIZADO">Localizado</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-neutral-700 mt-5 p-3 rounded font-bold uppercase cursor-pointer"
          >
            {isSubmitting ? "Buscando..." : "Buscar"}
        </button>
    </form>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {
        missingPersons.length > 0 ?
        (
          <>
            {missingPersons.map((person) => (<Card key={person.id} person={person} />))}
            <LoadMore
              missingPersons={missingPersons}
              setMissingPersons={setMissingPersons}
              filters={filters}
            />
          </>
        ) :
        <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center gap-3">
          <p className="text-3xl">😔</p>
          <p className="font-medium text-3xl">Desculpe, não encontrei ninguém.</p>
        </div>
      }
    </div>
    </>
  )
}