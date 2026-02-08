import { useRouter, useSearchParams } from "next/navigation";

export function useClearSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clearParam = (param: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(param);
    router.replace(`?${newSearchParams.toString()}`);
  };

  return { clearParam };
}
