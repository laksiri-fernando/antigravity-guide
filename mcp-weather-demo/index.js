import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import axios from "axios";

// Define the tool input schema
const WeatherSchema = z.object({
  city: z.string().describe("The city to get the weather for"),
});

// Create the MCP server
const server = new Server(
  {
    name: "weather-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_weather",
        description: "Get the current weather for a specific city",
        inputSchema: {
          type: "object",
          properties: {
            city: {
              type: "string",
              description: "The city to get the weather for",
            },
          },
          required: ["city"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "get_weather") {
    throw new Error("Tool not found");
  }

  // Validate input
  const { city } = WeatherSchema.parse(request.params.arguments);

  try {
    // 1. Geocode the city name to get coordinates
    const geoResponse = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search`,
      {
        params: {
          name: city,
          count: 1,
          language: "en",
          format: "json",
        },
      }
    );

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: `Could not find location coordinates for "${city}".`,
          },
        ],
        isError: true,
      };
    }

    const { latitude, longitude, name, country } = geoResponse.data.results[0];

    // 2. Fetch weather data using coordinates
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast`,
      {
        params: {
          latitude,
          longitude,
          current_weather: true,
          temperature_unit: "celsius",
        },
      }
    );

    const weather = weatherResponse.data.current_weather;
    const temp = weather.temperature;
    const windspeed = weather.windspeed;

    return {
      content: [
        {
          type: "text",
          text: `Current weather in ${name}, ${country}:\n- Temperature: ${temp}°C\n- Wind Speed: ${windspeed} km/h`,
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return {
      content: [
        {
          type: "text",
          text: `Error fetching weather: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server using stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
