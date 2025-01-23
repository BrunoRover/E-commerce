import { signOut, useSession } from "next-auth/react";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); 
  };

  return (
    <div>
      {session ? (
        <button onClick={handleLogout} 
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        aria-label="Logout">Sair
        </button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default LogoutButton;
