# MCP Weather Demo

>This demo is built to showcase the capabilities of MCP servers in antigravity. In a real-world scenario, this application would use an MCP server to fetch weather data from a weather API. This demo uses a mock weather API to simulate the behavior of an MCP server.

## Steps to create MCP weather demo

1. Create a new directory for the project and initialize npm

```bash

mkdir mcp-weather-demo
cd mcp-weather-demo
npm init -y
```

2. Install necessary dependencies

```bash
npm install @modelcontextprotocol/sdk zod axios
```

3. Create index.js file

```bash
touch index.js
```

4. Run the demo

```bash
npx @modelcontextprotocol/inspector node index.js

# If there is an error, try with full path:
npx @modelcontextprotocol/inspector node /home/laksiri/my/lessions/antigravity/antigravity-guide/mcp-weather-demo/index.js
```

5. Add MCP Weather Server to antigravity

- Open `~/.antigravity/settings.json`
- Add the following to the `tools` array:

```json

"tools": [
  {
    "command": "/usr/bin/npx",
    "args": [
      "@modelcontextprotocol/inspector",
      "node",
      "/home/laksiri/my/lessions/antigravity/antigravity-guide/mcp-weather-demo/index.js"
    ]
  }
]
```

6. Test MCP Weather Server in antigravity

- Open antigravity
- Type: "What is the weather like in Colombo?"

