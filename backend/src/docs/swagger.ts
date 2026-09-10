export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Car Expenses & Trip Master API',
    version: '1.0.0',
    description: 'RESTful API documentation for Authentication, Trip Master, and OpenStreetMap Places Autocomplete.',
    contact: {
      name: 'CarExpenses Support',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token (without Bearer prefix)',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '663f78921a8c9b001efc1234' },
          name: { type: 'string', example: 'Karthik' },
          phone: { type: 'string', example: '+919876543210' },
          email: { type: 'string', example: 'karthik@gmail.com' },
          role: { type: 'string', enum: ['admin', 'driver'], example: 'driver' },
          car_number: { type: 'string', example: 'TN-01-AB-1234' },
          is_active: { type: 'boolean', example: true },
          created_at: { type: 'string', format: 'date-time' },
        },
      },
      Trip: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '663f80c11a8c9b001efc7890' },
          from: { type: 'string', example: 'Chennai Central, Tamil Nadu, India' },
          to: { type: 'string', example: 'Karaikudi, Sivaganga, Tamil Nadu, India' },
          date: { type: 'string', format: 'date-time', example: '2026-09-10T10:00:00.000Z' },
          fuel_amount: { type: 'number', example: 3500 },
          liters: { type: 'number', example: 35 },
          toll: { type: 'boolean', example: true },
          toll_amount: { type: 'number', example: 450 },
          phone_number: { type: 'string', example: '+919876543210' },
          customer_name: { type: 'string', example: 'Praveen Kumar' },
          trip_amount: { type: 'number', example: 6800 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      PlaceItem: {
        type: 'object',
        properties: {
          label: { type: 'string', example: 'Karaikudi, Sivaganga, Tamil Nadu, India' },
          value: { type: 'string', example: 'Karaikudi, Sivaganga, Tamil Nadu, India' },
          name: { type: 'string', example: 'Karaikudi' },
          city: { type: 'string', example: 'Karaikudi' },
          district: { type: 'string', example: 'Sivaganga' },
          state: { type: 'string', example: 'Tamil Nadu' },
          country: { type: 'string', example: 'India' },
          postcode: { type: 'string', example: '630001' },
          coordinates: {
            type: 'array',
            items: { type: 'number' },
            example: [78.784, 10.069],
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string', example: 'Error message description' },
        },
      },
    },
  },
  paths: {
    '/api/auth/register': {
      post: {
        summary: 'Register User',
        tags: ['Authentication'],
        description: 'Register a new user (Admin or Driver).',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'phone', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Karthik' },
                  phone: { type: 'string', example: '+919876543210' },
                  email: { type: 'string', format: 'email', example: 'karthik@gmail.com' },
                  password: { type: 'string', format: 'password', minLength: 6, example: 'password123' },
                  role: { type: 'string', enum: ['admin', 'driver'], default: 'driver', example: 'driver' },
                  car_number: { type: 'string', example: 'TN-01-AB-1234' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully with auth token',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsIn...' },
                    user: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Validation error or User already exists',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'Login User',
        tags: ['Authentication'],
        description: 'Authenticate user with email & password to retrieve JWT token.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'karthik@gmail.com' },
                  password: { type: 'string', format: 'password', example: 'password123' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsIn...' },
                    user: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          401: {
            description: 'Invalid credentials',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          403: {
            description: 'Account deactivated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    '/api/auth/verify-email': {
      post: {
        summary: 'Verify Email (Forgot Password Step 1)',
        tags: ['Authentication'],
        description: 'Checks whether the email exists in the database and is active.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'karthik@gmail.com' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Email verified successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Email verified successfully' },
                    data: {
                      type: 'object',
                      properties: {
                        email: { type: 'string', example: 'karthik@gmail.com' },
                        name: { type: 'string', example: 'Karthik' },
                      },
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'No account found with this email',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    '/api/auth/reset-password': {
      post: {
        summary: 'Reset Password (Forgot Password Step 2)',
        tags: ['Authentication'],
        description: 'Updates user password after email verification.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'newPassword', 'confirmPassword'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'karthik@gmail.com' },
                  newPassword: { type: 'string', format: 'password', minLength: 6, example: 'newpass123' },
                  confirmPassword: { type: 'string', format: 'password', example: 'newpass123' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Password reset successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Password has been reset successfully. You can now login with your new password.' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Passwords do not match or length less than 6 characters',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
          404: {
            description: 'User not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    '/api/auth/me': {
      get: {
        summary: 'Get Logged In User Profile',
        tags: ['Authentication'],
        security: [{ bearerAuth: [] }],
        description: 'Retrieves current logged in user details using JWT Bearer token.',
        responses: {
          200: {
            description: 'Current user profile data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized / Token invalid or missing',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    '/api/trips/places-autocomplete': {
      get: {
        summary: 'Search & Autocomplete Places (OpenStreetMap Photon API)',
        tags: ['Trip Master'],
        description: 'Searches real-time places, cities, and landmarks matching user input query.',
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: true,
            schema: { type: 'string' },
            description: 'Search keyword (e.g. karaikudi, chennai, trichy)',
            example: 'karaikudi',
          },
        ],
        responses: {
          200: {
            description: 'List of matching places and coordinates',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    count: { type: 'number', example: 5 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/PlaceItem' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/trips': {
      get: {
        summary: 'Get All Trips',
        tags: ['Trip Master'],
        description: 'Retrieve list of all trips with search and date filters.',
        parameters: [
          {
            name: 'search',
            in: 'query',
            schema: { type: 'string' },
            description: 'Filter by customer name, phone number, from, or to location',
            example: 'Praveen',
          },
          {
            name: 'from_date',
            in: 'query',
            schema: { type: 'string', format: 'date' },
            description: 'Start date filter (YYYY-MM-DD)',
          },
          {
            name: 'to_date',
            in: 'query',
            schema: { type: 'string', format: 'date' },
            description: 'End date filter (YYYY-MM-DD)',
          },
        ],
        responses: {
          200: {
            description: 'List of trips',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    count: { type: 'number', example: 10 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Trip' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create New Trip',
        tags: ['Trip Master'],
        description: 'Save a new trip entry in the trip collection.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['from', 'to', 'phone_number', 'customer_name', 'trip_amount'],
                properties: {
                  from: { type: 'string', example: 'Chennai Central, Tamil Nadu, India' },
                  to: { type: 'string', example: 'Karaikudi, Tamil Nadu, India' },
                  date: { type: 'string', format: 'date-time', example: '2026-09-10T10:00:00.000Z' },
                  fuel_amount: { type: 'number', example: 3500 },
                  liters: { type: 'number', example: 35 },
                  toll: { type: 'boolean', example: true },
                  toll_amount: { type: 'number', example: 450 },
                  phone_number: { type: 'string', example: '+91 9876543210' },
                  customer_name: { type: 'string', example: 'Praveen Kumar' },
                  trip_amount: { type: 'number', example: 6800 },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Trip created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Trip created successfully' },
                    data: { $ref: '#/components/schemas/Trip' },
                  },
                },
              },
            },
          },
          400: {
            description: 'Validation error',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
    '/api/trips/{id}': {
      get: {
        summary: 'Get Trip by ID',
        tags: ['Trip Master'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Trip MongoDB ID',
            example: '663f80c11a8c9b001efc7890',
          },
        ],
        responses: {
          200: {
            description: 'Trip details',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Trip' },
                  },
                },
              },
            },
          },
          404: {
            description: 'Trip not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
      put: {
        summary: 'Update Trip by ID',
        tags: ['Trip Master'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Trip MongoDB ID',
            example: '663f80c11a8c9b001efc7890',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  from: { type: 'string', example: 'Chennai Airport, Tamil Nadu' },
                  to: { type: 'string', example: 'Karaikudi, Tamil Nadu' },
                  date: { type: 'string', format: 'date-time' },
                  fuel_amount: { type: 'number', example: 3800 },
                  liters: { type: 'number', example: 38 },
                  toll: { type: 'boolean', example: true },
                  toll_amount: { type: 'number', example: 500 },
                  phone_number: { type: 'string', example: '+91 9876543210' },
                  customer_name: { type: 'string', example: 'Praveen Kumar' },
                  trip_amount: { type: 'number', example: 7200 },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Trip updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Trip updated successfully' },
                    data: { $ref: '#/components/schemas/Trip' },
                  },
                },
              },
            },
          },
          404: {
            description: 'Trip not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
      delete: {
        summary: 'Delete Trip by ID',
        tags: ['Trip Master'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Trip MongoDB ID',
            example: '663f80c11a8c9b001efc7890',
          },
        ],
        responses: {
          200: {
            description: 'Trip deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Trip deleted successfully' },
                    data: { type: 'object', example: {} },
                  },
                },
              },
            },
          },
          404: {
            description: 'Trip not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } },
          },
        },
      },
    },
  },
};
