import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Analysis from "./components/analysis/Analysis";
import Dashboard from './components/dashboard/Dashboard'
import USDRate from "./components/usd-rate/USDRate";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/analysis",
      element: <Analysis />,
    },
    {
      path: "/usd-rate",
      element: <USDRate />,
    },
  ]);
  return (
    <>
      <>
        <RouterProvider router={router} />
      </>
    </>
  )
}

export default App;