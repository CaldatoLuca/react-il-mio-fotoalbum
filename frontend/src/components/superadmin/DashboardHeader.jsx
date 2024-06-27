import { useAuth } from "../../contexts/AuthContext";

export default () => {
  const { user } = useAuth();
  return (
    <header className="flex justify-between items-center p-5 bg-neutral-900 text-neutral-200 backdrop-blur-xl shadow-2xl">
      <h1>Welcome {user.name}</h1>
    </header>
  );
};
