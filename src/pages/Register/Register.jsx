import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authApi } from '../../utils/authApi';
import { signUpWithEmail, signInWithGoogle } from '../../utils/firebaseAuth';
import useAuthStore from '../../store/authStore';
import authImage from '../../assets/authImage.png';
import { Loader1 } from '../../components/Loader/Loader';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Try Firebase auth first, fallback to API
      try {
        const response = await signUpWithEmail(
          data.email,
          data.password,
          data.name,
          data.phone
        );
        if (response.success) {
          // Save user to backend database
          try {
            console.log('Saving user to backend database:', {
              name: data.name,
              email: data.email,
              phone: data.phone,
              uid: response.user.uid,
            });
            
            const backendResponse = await authApi.register({
              name: data.name,
              email: data.email,
              phone: data.phone,
              uid: response.user.uid, // Firebase UID
              password: data.password, // Send password for backend to hash
            });
            
            console.log('User saved to backend database:', backendResponse);
            toast.success('User registered successfully in database!');
          } catch (backendError) {
            // If backend save fails, show error but don't block registration
            console.error('Failed to save user to backend database:', backendError);
            console.error('Error details:', backendError.response?.data || backendError.message);
            toast.error('Registration successful but failed to save to database. Please contact support.');
            // User is still registered in Firebase, so continue
          }
          
          login(response.user, response.token);
          toast.success('Registration successful!');
          navigate('/dashboard');
        }
      } catch (firebaseError) {
        // Fallback to API if Firebase fails
        console.log('Firebase registration failed, trying backend API:', firebaseError);
        try {
          const response = await authApi.register({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
          });
          
          console.log('Backend registration response:', response);
          
          if (response.success) {
            login(response.user, response.token);
            toast.success('Registration successful!');
            navigate('/dashboard');
          }
        } catch (apiError) {
          console.error('Backend API registration error:', apiError);
          console.error('Error details:', apiError.response?.data || apiError.message);
          throw apiError;
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithGoogle();
      if (response.success) {
        // Save user to backend database
        try {
          console.log('Saving Google user to backend database:', {
            name: response.user.displayName,
            email: response.user.email,
            uid: response.user.uid,
          });
          
          const backendResponse = await authApi.register({
            name: response.user.displayName || 'User',
            email: response.user.email,
            phone: response.user.phoneNumber || '',
            uid: response.user.uid, // Firebase UID
            // No password for Google sign-in
          });
          
          console.log('Google user saved to backend database:', backendResponse);
          toast.success('User registered successfully in database!');
        } catch (backendError) {
          // If backend save fails, show error but don't block registration
          console.error('Failed to save Google user to backend database:', backendError);
          console.error('Error details:', backendError.response?.data || backendError.message);
          toast.error('Registration successful but failed to save to database. Please contact support.');
          // User is still registered in Firebase, so continue
        }
        
        login(response.user, response.token);
        toast.success('Registration successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1800px] rounded-2xl s flex items-center justify-center bg-gray-50 py-12 px-4 my-5 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="hidden md:block">
          <img
            src={authImage}
            alt="Register"
            className="w-full h-auto rounded-2xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">
                Sign up to get started with ZapShift
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  className={`w-full px-4 py-3 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CAEB66] ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#CAEB66] ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid phone number',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-[#CAEB66] ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`w-full text-black px-4 focus:font-bold  py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CAEB66] ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  className={`w-full px-4 text-black focus:font-bold py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#CAEB66] ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  {...register('terms', {
                    required: 'You must agree to the terms and conditions',
                  })}
                  className="h-4 w-4 mt-1 text-[#CAEB66] focus:ring-[#CAEB66] border-white-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-[#CAEB66] hover:text-[#a8c94a]">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#CAEB66] hover:text-[#a8c94a]">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-600">{errors.terms.message}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-black bg-[#CAEB66] hover:bg-[#a8c94a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CAEB66] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? <Loader1 /> : 'Sign Up'}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CAEB66] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading ? <Loader1 /> : 'Sign up with Google'}
            </button>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-[#CAEB66] hover:text-[#a8c94a]"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
