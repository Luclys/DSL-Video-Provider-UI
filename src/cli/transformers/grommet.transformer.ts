import { App } from '../../language-server/generated/ast';
import path from "path";
import * as fs from "fs";

const template = `import * as React from 'react';
import { Grommet } from 'grommet';

function App() {
  return (
    <Grommet plain>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </Grommet>
  );
}

export default App;
`

export async function generateApp(app: App, destination: string) {
    const target = path.join(destination, 'App.tsx');

    fs.writeFileSync(target, template);
}