# Gulp build system

## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run start
```

For production environments…

```sh
npm run build
```

## Installation with React

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run init-react
```
## Example components:

Create `test-component.jsx ` into `src/js/components`:

```sh
import React, { useState } from 'react';

export const TestComponent = () => {
    const [count, setCount] = useState(0);

    return (
      <>
        <h1>{count}</h1>
        <button onClick={() => setCount(count - 1)}>
          Decrement
        </button>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </>
    );
}

export default TestComponent;
```

Create `app.jsx` into `src/js`:
```sh
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import TestComponent from './components/test-component.jsx';

    const root = createRoot(document.getElementById('react'));
    root.render(<TestComponent />);
```
In your `.html` file create root tag when will be render react:

```sh
    <div id="react"></div>
```

Start server:

```sh
    npm run start-react
```
For production environments...

```sh
    npm run build-react
```
