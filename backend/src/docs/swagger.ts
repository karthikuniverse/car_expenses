export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Car Expenses Auth API',
    version: '1.0.0',
    description: 'RESTful API documentation for Authentication & User Management.',
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
  },
};
