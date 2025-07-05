import { Wallet } from "lucide-react";
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
    <div className="flex justify-between items-center border-b p-2 gap-4">
      <div className="flex items-center gap-2 font-mono text-xl font-bold">
        <Wallet className="w-5 h-8" />
        <h2>Paylane</h2>
      </div>
      <Button onClick={user ? onSignout : onSignin}>
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  );
};
