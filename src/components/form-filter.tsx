'use client'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Filters, MissingPerson } from "@/types";
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
  persons: MissingPerson[]
}

export function FormFilter({ persons }: Props) {
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({})
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>(persons)

  const {
    register,
    handleSubmit,
  } = useForm<FormData>({
      resolver: zodResolver(schema)
  });

  async function onChange(data: FormData) {
    const filters = {
      nome: data.name,
      sexo: data.sex,
      faixaIdadeInicial: data.minAge,
      faixaIdadeFinal: data.maxAge,
      status: data.status,
    }
    setLoading(true);
    const { content: response } = await fetchMissingPersons(filters)
    setFilters(filters)
    setMissingPersons(response);
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full items-center max-w-[1200px] px-10 gap-5">
      <form
        onChange={handleSubmit(onChange)}
        className="self-stretch"
      >
        <div className="flex flex-col lg:flex-row gap-2">
          <input type="text" id="name" className="text-gray-400 border-1 border-gray-800 rounded p-2 grow" {...register('name')} placeholder="Nome" />
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
          <input type="number" id="min-age" min="0" className="text-gray-400 border-1 border-gray-800 rounded p-2 grow"{...register('minAge')} placeholder="Idade mínima" />
          <input type="number" id="max-age" min="0" className="text-gray-400 border-1 border-gray-800 rounded p-2 grow"{...register('maxAge')} placeholder="Idade máxima"/>
          <select
            id="sex"
            defaultValue=""
            className="text-gray-400 border-1 border-gray-800 rounded p-2 grow"
            {...register('status')}
          >
            <option value="">Status</option>
            <option value="DESAPARECIDO">Desaparecido</option>
            <option value="LOCALIZADO">Localizado</option>
          </select>
        </div>
      </form>
      {
        loading ?
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg transition-opacity duration-300">
            <div className="animate-spin h-5 w-5 border-2 border-amber-700 border-t-transparent rounded-full" />
          </div>
        :
          missingPersons.length > 0 ?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {missingPersons.map((person) => (
                <Card key={person.id} person={person} />
              ))}
              <LoadMore
                setMissingPersons={setMissingPersons}
                filters={filters}
              />
            </div>
          :
            <div className="flex flex-col items-center gap-3">
              <p className="text-3xl">😔</p>
              <p className="font-medium text-3xl">Desculpe, não encontrei ninguém.</p>
            </div>
      }
    </div>
  )
}