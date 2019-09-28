import React from 'react';
import AudioEngine from './components/AudioEngine'


import Controls from './components/Controls'
function App() {
  return (
  

      <div className="App" style={{ minHeight:'100vh', padding:100}}>
        <h1>Tender Roentgen</h1>
      <AudioEngine></AudioEngine>
        <Controls></Controls>
      </div>
  );
}



export default App;
