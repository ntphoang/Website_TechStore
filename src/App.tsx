import { authApi } from "./features/auth/api/authApi";

function App() {
  const test = async () => {
    try {
      const res = await authApi.login("admin@gmail.com", "12345");
      console.log(res);
    } catch (e) {
      console.log("Lỗi");
    }
  };

  return <button onClick={test}>Test</button>;
}

export default App;