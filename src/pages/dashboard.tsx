import { useSession, signIn } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div>
        <p>You must be logged in to access this page.</p>
        <button onClick={() => signIn()}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user.email}!</h1>
      {session.user.isAdmin && <p>You have admin privileges.</p>}
    </div>
  );
}
