import { RouterProvider } from 'react-router-dom';
import router from './routers';
import './App.css';

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
