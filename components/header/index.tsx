import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  title?: string;
  className?: string;
  searchQuery?: string;
  isSearching?: boolean;
  showSearch?: boolean;
  onSearchToggle?: () => void;
  setSearchQuery?: (query: string) => void;
}

const Header = ({ title, isSearching, className }: HeaderProps) => {
  return (
    <header
      style={{ boxShadow: "0px 5px 8px -1px rgba(0,0,0,0.3)" }}
      className={`fixed top-0 left-0 right-0 z-10 bg-background ${className}`}
    >
      <div
        data-id="container"
        className="px-5 h-14 flex items-center justify-between"
      >
        <div
          data-id="logo-container"
          className="flex flex-row items-center  animate-jump"
        >
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="GTL Logo"
              width={30}
              height={30}
            />

            {!isSearching && (
              <div className="flex flex-row space-x-1 items-center">
                <h1 className="text-xl font-semibold text-white leading-none">
                  {title || "GTL"}
                </h1>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
