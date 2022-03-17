import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from 'recoil';
import GroceryList from './components/GroceryList';

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <RecoilRoot>
            <Routes>
              <Route path='/list' element={<GroceryList />} />
            </Routes>
          </RecoilRoot>
        </Router>
      </SnackbarProvider>
    </>
  );
}

export default App;
