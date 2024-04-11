import React, { useState } from 'react';
import Form from './components/Form';
import Button from './components/Button';
import Modal from './components/Modal';
import './App.css';
import Divider from './components/Divider';

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="app">
      <Modal visible={visible} />

      <Button onClick={() => setVisible(true)}>点 我</Button>
      <div className="lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse
        dolorum aspernatur, officiis inventore, voluptate rerum repellendus
        exercitationem laudantium ipsam facilis non impedit saepe ea in qui
        ducimus quibusdam cum!
      </div>
      <Divider direction="horizontal" textAlign="right">
        <div>hello world</div>
      </Divider>
      <div className="lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse
        dolorum aspernatur, officiis inventore, voluptate rerum repellendus
        exercitationem laudantium ipsam facilis non impedit saepe ea in qui
        ducimus quibusdam cum!
      </div>
      <div className="lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse
        dolorum aspernatur, officiis inventore, voluptate rerum repellendus
        exercitationem laudantium ipsam facilis non impedit saepe ea in qui
        ducimus quibusdam cum!
      </div>
      <div className="lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia esse
        dolorum aspernatur, officiis inventore, voluptate rerum repellendus
        exercitationem laudantium ipsam facilis non impedit saepe ea in qui
        ducimus quibusdam cum!
      </div>
    </div>
  );
}

export default App;
