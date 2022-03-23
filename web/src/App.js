import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from 'recoil';
import ListView from './components/ListView';

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <RecoilRoot>
            <Routes>
              <Route path='/list/:listCode' element={<ListView />} />
            </Routes>
          </RecoilRoot>
        </Router>
      </SnackbarProvider>
    </>
  );
}

export default App;
