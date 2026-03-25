import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

interface PaperFilters {
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export const usePapers = (filters: PaperFilters = {}) => {
  return useQuery({
    queryKey: ["papers", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.type) params.append("type", filters.type);
      if (filters.search) params.append("search", filters.search);
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.limit) params.append("limit", filters.limit.toString());
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

      const res = await fetch(`/api/papers?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch papers");
      return res.json();
    },
  });
};

export const usePaper = (idOrSlug: string) => {
  const { firebaseUid } = useAuth();
  
  return useQuery({
    queryKey: ["paper", idOrSlug],
    queryFn: async () => {
      const headers: HeadersInit = {};
      if (firebaseUid) headers["x-firebase-uid"] = firebaseUid;

      const res = await fetch(`/api/papers/${idOrSlug}`, { headers });
      if (!res.ok) throw new Error("Failed to fetch paper");
      return res.json();
    },
    enabled: !!idOrSlug,
  });
};

export const useMyPapers = (status?: string) => {
  const { firebaseUid } = useAuth();

  return useQuery({
    queryKey: ["my-papers", firebaseUid, status],
    queryFn: async () => {
      if (!firebaseUid) throw new Error("Unauthorized");
      
      const params = new URLSearchParams();
      if (status) params.append("status", status);

      const res = await fetch(`/api/papers/my?${params.toString()}`, {
        headers: { "x-firebase-uid": firebaseUid },
      });
      if (!res.ok) throw new Error("Failed to fetch your papers");
      return res.json();
    },
    enabled: !!firebaseUid,
  });
};
