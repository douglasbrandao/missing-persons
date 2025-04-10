'use server';

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

interface PersonInformation {
  information: string,
  description: string,
  date: Date,
  occurence_id: number,
  files?: FileList
}

export async function sendMissingPersonInformation({
  information,
  description,
  date,
  occurence_id,
  files
  }: PersonInformation) {

  const formData = new FormData()

  if (files) {
    for (const file of files) {
      formData.append('files', file)
    }
  }

  const params = new URLSearchParams({
    'informacao': information,
    'descricao': description,
    'data': date.toISOString().split('T')[0],
    'ocoId': occurence_id.toString(),
  });

  await fetch(`${NEXT_PUBLIC_BASE_URL}/ocorrencias/informacoes-desaparecido?${params}`, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Response was not ok')
    }
    return response.json()
  })
}
