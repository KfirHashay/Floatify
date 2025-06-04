# Floatify
flexible notification system

## Running the example locally

1. From the repository root, build the library so the `dist` folder is generated:
   ```bash
   npm run build
   ```
2. In `example/package.json`, add a dependency pointing to the local package:
   ```json
   "floatify": "file:.."
   ```
3. Install the example dependencies which links the local build:
   ```bash
   cd example
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
