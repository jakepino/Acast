import React from 'react';
import { useState, useEffect } from 'react';

import Dashboard from './Dashboard.jsx';

function App() {
  const [allEps, setEps] = useState('');
  useEffect(() => {
    fetch('/episodes')
      .then((resp) => resp.json())
      .then((data) => {
        setEps(data);
      });
  }, []);

  return (
    <div>
      <Dashboard pods={allEps} />
    </div>
  );
}

export default App;
