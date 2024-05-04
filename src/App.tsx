import { useContext } from "react";
import { RouterProvider } from "react-router-dom";

import PromptMessage from "./components/PromptMessage";
import { PromptMessageContext } from "./context/PromptMessage/PromptMessageContext";
import router from "./route";

function App() {
  const [message] = useContext(PromptMessageContext);
  return (
    <section className=" w-full flex justify-center min-h-screen">
      {message.toggle && <PromptMessage />}
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
