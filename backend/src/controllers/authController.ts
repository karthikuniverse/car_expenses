import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { ProtectRequest } from '../middlewares/authMiddleware';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, phone, email, password, role, car_number } = req.body;

    // Check if password was provided
    if (!password) {
      res.status(400).json({ success: false, error: 'Please provide a password' });
      return;
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ success: false, error: 'User already exists with this email' });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      phone,
      email,
      password_hash,
      role,
      car_number,
      is_active: true,
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Please provide email and password' });
      return;
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password_hash');
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    // Check if user is active
    if (!user.is_active) {
      res.status(403).json({ success: false, error: 'User account is deactivated' });
      return;
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: ProtectRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify old/registered email for password reset
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, error: 'Please provide an email address' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists with this email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      res.status(404).json({ success: false, error: 'No account found with this email address' });
      return;
    }

    // Check if user account is active
    if (!user.is_active) {
      res.status(403).json({ success: false, error: 'User account is deactivated. Please contact support.' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password after email verification
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, newPassword, password, confirmPassword, confirm_password } = req.body;

    const userEmail = email?.toLowerCase().trim();
    const finalPassword = newPassword || password;
    const finalConfirmPassword = confirmPassword || confirm_password;

    if (!userEmail) {
      res.status(400).json({ success: false, error: 'Please provide the verified email address' });
      return;
    }

    if (!finalPassword) {
      res.status(400).json({ success: false, error: 'Please provide a new password' });
      return;
    }

    if (!finalConfirmPassword) {
      res.status(400).json({ success: false, error: 'Please confirm your new password' });
      return;
    }

    if (finalPassword !== finalConfirmPassword) {
      res.status(400).json({ success: false, error: 'New password and confirm password do not match' });
      return;
    }

    if (finalPassword.length < 6) {
      res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({ success: false, error: 'No account found with this email address' });
      return;
    }

    if (!user.is_active) {
      res.status(403).json({ success: false, error: 'User account is deactivated. Please contact support.' });
      return;
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(finalPassword, salt);

    user.password_hash = password_hash;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.',
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get token from model and send response
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      car_number: user.car_number,
      is_active: user.is_active,
      created_at: user.created_at,
    },
  });
};
