import { signOut, useSession } from "next-auth/react";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/signin" }); // Redireciona para a página de login
  };

  return (
    <div>
      {session ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default LogoutButton;
