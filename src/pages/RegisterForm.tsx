export default function RegisterForm() {
  return (
    <form className="w-full">
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>

      <input placeholder="Username" className="w-full mb-3 p-3 border rounded" />
      <input placeholder="Email" className="w-full mb-3 p-3 border rounded" />
      <input type="password" placeholder="Password" className="w-full mb-3 p-3 border rounded" />

      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-full mb-4">
        Register
      </button>
    </form>
  );
}
