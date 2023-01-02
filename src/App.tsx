import React from 'react';
import Form from './components/Form';
import Button from './components/Button';

import './App.css';

function App() {
  return (
    <div>
      <div>
        <Button type="primary" shape="round" disabled={true}>
          确认
        </Button>
      </div>
      <div>
        <Button
          type="primary"
          loading
          onClick={() => console.log('hello world')}
        ></Button>
      </div>
      <div>
        <Button type="secondary" block>
          确认
        </Button>
      </div>
      <div>
        <Button type="dashed">确认</Button>
      </div>
      <div>
        <Button type="link">确认</Button>
      </div>
      <div>
        <Button type="text">确认</Button>
      </div>
    </div>
  );
}

export default App;
