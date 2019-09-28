import React from 'react';
import AudioEngine from './components/AudioEngine'


import Controls from './components/Controls'
function App() {
  return (
  

      <div className="App" style={{background:'#313131', minHeight:'100vh', padding:100}}>
      <AudioEngine></AudioEngine>
        <Controls></Controls>
      </div>
  );
}



export default App;
