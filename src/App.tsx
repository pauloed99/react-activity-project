import React from 'react';
import GlobalContext from './contexts';
import ActivityPage from './pages/activity/ActivityPage';

function App() {
  return (
    <>
      <GlobalContext>
        <ActivityPage />
      </GlobalContext>
    </>
  );
}

export default App;
