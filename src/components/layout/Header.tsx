
import React from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeaderProps = {
  toggleSidebar: () => void;
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-4 sticky top-0 z-10">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="hidden md:flex max-w-md flex-1 ml-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Cari..."
            className="w-full pl-9 rounded-md bg-gray-50 focus:bg-white"
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-hrm-primary rounded-full"></span>
        </Button>
      </div>
    </header>
  );
};
