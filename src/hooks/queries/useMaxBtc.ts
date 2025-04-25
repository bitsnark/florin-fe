import { FlorinApiService } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";

export const useMaxBtc = () => {
  return useQuery({
    queryKey: ["max-btc"],
    queryFn: () => FlorinApiService.getMaxAmount(),
  });
};