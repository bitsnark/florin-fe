import { FlorinApiService } from "@/services/Api";
import { useQuery } from "@tanstack/react-query";

export const useMaxMinBtc = () => {
  return useQuery({
    queryKey: ["max-min-btc"],
    queryFn: () => FlorinApiService.getMaxAmount(),
  });
};