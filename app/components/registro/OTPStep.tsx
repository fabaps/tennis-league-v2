import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuth";
import { useRouter } from "next/navigation";

export default function OTPStep() {
  const [otp, setOtp] = useState("");
  const { verifyOTP, loading, error, phoneNumber } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOTP(otp);
      router.push("/ranking");
    } catch (error) {
      // Error ya manejado por el store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="otp">Código de verificación</Label>
        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-1"
          placeholder="Ingresa el código de 6 dígitos"
        />
        <p className="text-sm text-gray-500 mt-2">
          Se envió un código al número {phoneNumber}
        </p>
      </div>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        {loading ? "Verificando..." : "Verificar código"}
      </Button>
    </form>
  );
}
