import { useSession } from "next-auth/react";
import { useState } from "react";

const EditProfile = () => {
    const { data: session } = useSession();
    const [name, setName] = useState(session?.user?.name || "");
    const [email, setEmail] = useState(session?.user?.email || "");

    const handleSave = async () => {
        // Logic to save the updated user profile
        // This could involve calling an API endpoint to update the user details in the database
        console.log("Saving profile:", { name, email });
    };

    return (
        <div>
            {session ? (
                <form onSubmit={handleSave}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded py-2 px-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded py-2 px-3"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                        aria-label="Save"
                    >
                        Save
                    </button>
                </form>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
};

export default EditProfile;