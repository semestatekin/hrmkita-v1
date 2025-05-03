
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CandidateSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  title: string;
}

const CandidateSearchBar: React.FC<CandidateSearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery,
  title
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cari kandidat..."
          className="pl-8 max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CandidateSearchBar;
