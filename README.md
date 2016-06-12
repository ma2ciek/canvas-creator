# Installation

```Bash
npm install js-creator --save-dev
```

In your *app.ts*:

```TypeScript
import * as creator from 'creator';

const canvas = document.querySelector('canvas');
const world = new creator.World(canvas, { ... });

world.add(new creator.Cell({
    src: 'path/to/file',
    x: Math.random() * canvas.width | 0,
    y: Math.random() * canvas.height | 0,
    width: 300,
    height: 300,
    draggable: true
}));

...

```
