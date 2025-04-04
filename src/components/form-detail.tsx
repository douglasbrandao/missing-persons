'use client'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMissingPersonInformation } from "@/actions/send-missing-person-information";
import { usePathname, useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { LastOccurence } from "@/types";
import { LoadingButton } from "./ui/loading-button";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const schema = z.object({
  information: z.string().nonempty({ message: 'Oh, não! Esse campo precisa ser preenchido.'}),
  description: z.string().nonempty({ message: 'Oh, não! Esse campo precisa ser preenchido.'}),
  date: z.coerce.date({ errorMap: ({ code }, { defaultError }) => {
    if (code == 'invalid_date') {
      return { message: 'Oh, não! A data informada é inválida.' }
    }
    return { message: defaultError }
  }}),
  file: z
    .custom<FileList>((files) => files instanceof FileList, {
      message: "Arquivo inválido",
    })
    .optional()
    .refine((files) => !files || Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
      message: "Faça o upload de uma imagem no formato .jpeg ou .png",
    })
    .refine((files) => !files || Array.from(files).every((file) => file.size <= MAX_FILE_SIZE), {
      message: "Cada arquivo deve ter menos de 3MB",
    }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  occurence: LastOccurence
}

export function FormDetail({ occurence }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
      errors,
    }
  } = useForm<FormData>({
      resolver: zodResolver(schema)
  });

  async function onSubmit(data: FormData) {
    try {
      await sendMissingPersonInformation({
        information: data.information,
        description: data.description,
        date: data.date,
        occurence_id: occurence.ocoId,
        files: data.file,
      })
      router.push(`${pathname}/success`)
    } catch {
      toast.error('Tivemos um problema com o envio dos dados', {
        onClose: () => {
          router.refresh()
        }
      })
    }
  };

  return (
    <div className="col-span-3">
      <div className="col-span-3 flex justify-center border-t-1 border-white pt-5 pb-5">
        <h1 className="text-3xl uppercase font-extrabold">Enviar informações</h1>
      </div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="information" className="text-sm font-bold">Informação</label>
        <input type="text" id="information" className="text-gray-400 border-1 border-gray-800 rounded w-full p-2" {...register('information')} />
        {errors.information &&
          <p className="text-sm text-red-500 mt-1">
            <span className="font-medium">{errors.information.message}</span>
          </p>}
        <label htmlFor="description" className="text-sm font-bold">Descrição</label>
        <input type="text" id="description" className="text-gray-400 border-1 border-gray-800 rounded w-full p-2" {...register('description')} />
        {errors.description &&
          <p className="text-sm text-red-500 mt-1">
            <span className="font-medium">{errors.description.message}</span>
          </p>}
        <label htmlFor="date" className="text-sm font-bold">Data</label>
        <input type="date" id="date" className="text-gray-400 border-1 border-gray-800 rounded w-full p-2"{...register('date')} />
        {errors.date &&
          <p className="text-sm text-red-500 mt-1">
            <span className="font-medium">{errors.date.message}</span>
          </p>}
        <label htmlFor="files" className="text-sm font-bold">Comprovação</label>
        <input type="file" id="files" className="text-gray-400 border-1 border-gray-800 rounded w-full p-2"{...register('file')} multiple/>
        {errors.file &&
          <p className="text-sm text-red-500 mt-1">
            <span className="font-medium">{errors.file.message}</span>
          </p>}
          <LoadingButton loading={isSubmitting} />
          <ToastContainer />
      </form>
    </div>
  )
}