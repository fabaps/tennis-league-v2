import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title?: string;
  className?: string;
  searchQuery?: string;
  isSearching?: boolean;
  showSearch?: boolean;
  onSearchToggle?: () => void;
  setSearchQuery?: (query: string) => void;
}

export default function Header({
  title,
  isSearching,
  searchQuery,
  setSearchQuery,
  onSearchToggle,
  showSearch = false,
  className = "bg-[#245A4C]",
}: HeaderProps) {
  return (
    <header
      className={`shadow-sm fixed top-0 left-0 right-0 z-10 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="GTL Logo"
              width={40}
              height={40}
              className="mr-3"
            />

            {!isSearching && (
              <h1 className="text-xl font-bold text-white">
                {title || "Bienvenido a GTL"}
              </h1>
            )}
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          {showSearch && (
            <>
              <Input
                type="text"
                placeholder="Buscar jugador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery?.(e.target.value)}
                className={`transition-all duration-300 bg-[#1e4a3f]/50 border-[#1e4a3f] text-white placeholder:text-gray-300 focus:border-[#1e4a3f] focus:ring-1 focus:ring-[#1e4a3f] ${
                  isSearching ? "w-full md:w-96" : "w-0 p-0 border-0"
                }`}
              />
              <Button
                onClick={onSearchToggle}
                variant="outline"
                size="icon"
                className="bg-[#1e4a3f] border-[#1e4a3f] text-white hover:bg-[#183b32] hover:text-white hover:border-[#183b32] transition-colors"
              >
                {isSearching ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
