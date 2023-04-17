import { RouterProvider } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { router } from './core/Routes';
import { DataProvider } from './core/Context';

function App() {
   return (
      <DataProvider>
         <div id="app">
            <main>
            <RouterProvider router={router}/> 
            </main>

            <Footer>©2023 Digital Booking</Footer>
            
         </div>
         
      </DataProvider>
   );
}

export default App;
