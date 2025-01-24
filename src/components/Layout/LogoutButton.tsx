import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const LogoutButton = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
    setIsLoading(false);  
  };

  return (
    <div>
      {session ? (
        <button
          onClick={handleLogout}
          disabled={isLoading}  
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          aria-label="Logout"
        >
          {isLoading ? "Logging out..." : "Sair"}
        </button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default LogoutButton;
