import { useAuth } from "../../contexts/AuthContext";

export default () => {
  const { user, logout } = useAuth();
  return (
    <header className="flex justify-between items-center p-5 bg-neutral-900 text-neutral-200 backdrop-blur-xl shadow-2xl">
      <h1>Welcome {user.name}</h1>

      <nav>
        <div className="hover:text-orange-300 transition cursor-pointer ">
          <button onClick={() => logout()}>Log Out</button>
        </div>{" "}
      </nav>
    </header>
  );
};
