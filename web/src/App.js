import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import { RecoilRoot, useRecoilState } from 'recoil';
import GroceryList from './components/GroceryList';
import { useEffect } from 'react';
import { webSocketAtom } from './atmos';

function App() {
  
  const LoadComponent = () => {
    const [webSocket, setWebSocket] = useRecoilState(webSocketAtom);

    useEffect(() => {
      // Do not recreate websocket if defined
      if (webSocket) return;

      const wsURL = `ws://${window.location.hostname}:8010/ws`;
      console.log('Creating websocket on', wsURL);

      const ws = new WebSocket(wsURL);

      ws.onmessage = message => {
        console.log('Socket received', message.data);
      }

      ws.onopen = () => { ws.send('Hello from client'); }

      setWebSocket(ws);
    }, []);

    return <></>
  }

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <RecoilRoot>
            <LoadComponent />
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
