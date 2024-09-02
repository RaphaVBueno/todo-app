import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Dashboard.tsx'

const router = createBrowserRouter([
  { index: true, path: '/:date?', element: <Dashboard /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
