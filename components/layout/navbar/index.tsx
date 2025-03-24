"use client";
import { CircleX, LogOutIcon, Search, User } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WalletModal from "@/components/walletModal";
import { useCurrentWalletAddress } from "@/hooks/wallet";
import { trimWallet } from "@/lib/utils";

import { useGoToSearch, useLogout, useOnChangeSearch } from "./hooks";
import ROUTES from "@/routes";
import Link from "next/link";

const Navbar: React.FC = () => {
  const searchParams = useSearchParams();

  const { wallet, setWallet } = useCurrentWalletAddress();

  const search = searchParams.get("search");

  const pathname = usePathname();

  const isSearchOpen = (search?.length ?? -1) >= 0;

  const goToSearch = useGoToSearch({ isSearchOpen, wallet });

  const onSubmitWallet = (wallet: string) => setWallet(wallet);

  const onChangeSearch = useOnChangeSearch();

  const logout = useLogout();

  const walletExists = (wallet?.length ?? 0) > 0;

  const profilePage = `${ROUTES.PROFILE}/${wallet}`;

  if (pathname === "/") return null;

  return (
    <div className="fixed w-full h-[65px] top-0 z-4 justify-center flex backdrop-blur-xs">
      <div className="max-w-[1000px] px-6 w-full h-full flex flex-row justify-end bg-transparent gap-2 items-center">
        {/* SEARCH */}
        <div className="flex items-center gap-2 rounded-lg pl-2">
          <button onClick={goToSearch}>
            {isSearchOpen ? (
              <CircleX color="white" />
            ) : (
              <Search color="white" />
            )}
          </button>

          <Input
            name="search"
            placeholder="Search wallet"
            onChange={onChangeSearch}
            className="min-w-0 text-xs text-[white] focus-visible:border-[white] tracking-wide border-[white] shadow-[0_0_5px_white,_inset_0_0_5px_white]"
            style={{
              borderWidth: isSearchOpen ? 2 : 0,
              paddingLeft: isSearchOpen ? "0.75rem" : 0,
              paddingRight: isSearchOpen ? "0.75rem" : 0,
              width: isSearchOpen ? "200px" : "0px",
              transition: "width 0.3s ease-in-out",
            }}
          />
        </div>

        {/*  ENTER WALLET */}
        {!walletExists && <WalletModal onSubmit={onSubmitWallet} />}

        {/* ACCOUNT MENU */}
        {walletExists && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{trimWallet(wallet)}</Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-50 flex flex-col"
              side="bottom"
              align="end"
              sideOffset={15}
            >
              <Link href={profilePage} className="w-full">
                <Button className="flex flex-row gap-2 cursor-pointer justify-start w-full">
                  <User size={16} className="text-white" />
                  <span className="text-white text-sm">Profile</span>
                </Button>
              </Link>

              <Button
                className="flex flex-row gap-2 cursor-pointer justify-start"
                onClick={logout}
              >
                <LogOutIcon size={16} className="text-white" />
                <span className="text-white text-sm">Logout</span>
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
