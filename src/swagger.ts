export const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "ProminentGateways",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "",
  schemes: ["http"],
  paths: {
    "/gateways": {
      get: {
        summary: "Get all gateways",
        responses: {
          "200": [],
        },
      },
      post: {
        summary: "Create a gateway",
        responses: {
          "200": [],
        },
        parameters: [
          {
            name: "Gateway",
            in: "body",
            description: "Gateway object",
            required: true,
            schema: {
              $ref: "#/definitions/Gateway",
            },
          },
        ],
      },
    },
    "/gateways/{id}": {
      get: {
        summary: "Get one gateway",
        responses: {
          "200": {},
        },
      },
      put: {
        summary: "Update a gateway",
        responses: {
          "200": {},
        },
        parameters: [
          {
            name: "Gateway",
            in: "body",
            description: "Gateway object",
            required: true,
            schema: {
              $ref: "#/definitions/Gateway",
            },
          },
        ],
      },
      delete: {
        summary: "Delete a gateway",
        responses: {
          "200": {},
        },
      },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Gateway id",
          required: true,
          type:'string'
        },
      ],
    },
  },
  definitions: {
    Gateway: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        serialNumber: {
          type: "string",
          
        },
        ipv4Address: {
          type: "string",
        },
        peripheralDevices: {
          type: "array",
        },
        name: {
          type: "string",
        },
      },
      required: ["name", "ipv4Address", "serialNumber"],
    },
  },
};

// "in": "query",
