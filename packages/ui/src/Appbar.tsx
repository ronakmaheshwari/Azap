import { Banknote } from "lucide-react";
import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
}: AppbarProps) => {
  return (
    <header className="flex justify-between items-center border-b bg-white shadow-sm p-3">
      <div className="flex items-center gap-2 text-primary font-semibold text-xl tracking-wide">
        <Banknote className="w-7 h-10 text-purple-500" /> 
        <span>Paylane</span>
      </div>

      <div className="flex items-center justify-center gap-5 text-sm sm:text-base">
        {user?.name && (
          <span className="text-gray-600">Welcome, {user.name}!</span>
        )}
        <Button
          onClick={user ? onSignout : onSignin}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </header>
  );
};
