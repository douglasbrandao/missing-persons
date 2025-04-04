interface Props {
  loading: boolean,
}

export function LoadingButton({ loading }: Props) {
  return (
     <button
      type="submit"
      disabled={loading}
      className={`inline-flex justify-center items-center mt-5 px-4 py-2 text-white font-medium rounded-md bg-neutral-700 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
    >
      {loading && (
        <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {loading ? 'Enviando...' : 'Enviar'}
    </button>
  )
}