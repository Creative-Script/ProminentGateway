export const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "ProminentGateways",
    version: "1.0.0",
    description:
      "ProminentGateways is an API that manages Gateways and the peripheral devices attached to them.\nFind the repository on Github at https://github.com/Creative-Script/ProminentGateway \nEnsure to select the right scheme.\nOn localhost  use http, \nand here in prod you can use https which is the default.",
    author: "Patrick Fitz ",
    contact: {
      name: "Patrick Fitz",
      url: "https://github.com/patrickf949",
      email: "patrickf1290@gmail.com",
    },
  },

  // host: "localhost:3000",
  // basePath: "",
  // schemes: ["https","http"],
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
              $ref: "#/definitions/GatewayAdd",
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
              $ref: "#/definitions/GatewayUpdate",
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
          type: "string",
        },
      ],
    },
    "/gateways/{id}/peripheralDevices": {
      get: {
        summary: "Get all peripherals in one gateway",
        responses: {
          "200": {},
        },
      },
      post: {
        summary: "Create a peripheral device inside a gateway",
        responses: {
          "201": {},
        },
        parameters: [
          {
            name: "Peripheral",
            in: "body",
            description: "Peripheral device object",
            required: true,
            schema: {
              $ref: "#/definitions/PeripheralDeviceUpdate",
            },
          },
        ],
      },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Gateway id",
          required: true,
          type: "string",
        },
      ],
    },
    "/gateways/{id}/peripheralDevices/{uid}": {
      put: {
        summary: "Update a peripheral in a gateway",
        responses: {
          "200": {},
        },
        parameters: [
          {
            name: "Peripheral",
            in: "body",
            description: "Peripheral device object",
            required: true,
            schema: {
              $ref: "#/definitions/PeripheralDeviceUpdate",
            },
          },
        ],
      },
      get: {
        summary: "Get a peripheral from a gateway",
        responses: {
          "200": {},
        },
      },
      delete: {
        summary: "Delete a peripheral from a gateway",
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
          type: "string",
        },
        {
          name: "uid",
          in: "path",
          description: "Peripheral device id",
          required: true,
          type: "string",
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
          items: {
            $ref: "#/definitions/PeripheralDevice",
          },
        },
      },
      required: ["ipv4Address", "serialNumber"],
    },
    GatewayAdd: {
      type: "object",
      properties: {
        serialNumber: {
          type: "string",
        },
        ipv4Address: {
          type: "string",
        },
        peripheralDevices: {
          type: "array",
          items: {
            $ref: "#/definitions/PeripheralDeviceUpdate",
          },
        },
      },
      required: ["ipv4Address", "serialNumber"],
    },
    GatewayUpdate: {
      type: "object",
      properties: {
        serialNumber: {
          type: "string",
        },
        ipv4Address: {
          type: "string",
        },
      },
      required: ["ipv4Address", "serialNumber"],
    },
    PeripheralDevice: {
      type: "object",
      properties: {
        uid: {
          type: "number",
        },
        vendor: {
          type: "string",
        },
        dateCreated: {
          type: "string",
        },
        status: {
          type: "string",
          enum: ["offline", "online"],
        },
      },
      required: ["vendor", "status"],
    },
    PeripheralDeviceUpdate: {
      type: "object",
      properties: {
        vendor: {
          type: "string",
        },
        dateCreated: {
          type: "string",
        },
        status: {
          type: "string",
          enum: ["offline", "online"],
        },
      },
      required: ["vendor", "status"],
    },
  },
  ui: {
    title: "Prominent Gateways API",
  },
};

// "in": "query",
