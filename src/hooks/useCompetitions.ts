import { useQuery } from "@tanstack/react-query";

interface CompetitionFilters {
  type?: string;
  active?: boolean;
}

export const useCompetitions = (filters: CompetitionFilters = {}) => {
  return useQuery({
    queryKey: ["competitions", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.type) params.append("type", filters.type);
      if (filters.active !== undefined) params.append("active", filters.active.toString());

      const res = await fetch(`/api/competitions?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch competitions");
      return res.json();
    },
  });
};

export const useCompetition = (id: string) => {
  return useQuery({
    queryKey: ["competition", id],
    queryFn: async () => {
      const res = await fetch(`/api/competitions/${id}`);
      if (!res.ok) throw new Error("Failed to fetch competition");
      return res.json();
    },
    enabled: !!id,
  });
};
