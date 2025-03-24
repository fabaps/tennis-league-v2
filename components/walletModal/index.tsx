"use client";

import { Terminal } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useEnterWallet } from "./hooks";

interface WalletModalProps {
  onSubmit?: (wallet: string) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ onSubmit: callback }) => {
  const closeRef: React.RefObject<HTMLButtonElement | null> = useRef(null);
  const {
    walletAddress,
    setWalletAddress,
    handler: handleSubmit,
  } = useEnterWallet({ callback, closeRef });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setWalletAddress(e.target.value);

  const cleanWallet = () => {
    localStorage.removeItem("wallet");
    setWalletAddress("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={cleanWallet}>
          Check my rank
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                <Terminal size={24} className="mr-2" /> Check your rank
              </DialogTitle>

              <DialogDescription className="text-white flex flex-row items-center text-xs text-left">
                🎯 How high did you climb? Enter your wallet address to find
                out!
              </DialogDescription>
            </DialogHeader>

            <div className="my-8">
              <Input
                name="wallet"
                value={walletAddress}
                placeholder="Wallet address"
                onChange={onChange}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild ref={closeRef}>
                <Button type="submit" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="outline">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default WalletModal;
