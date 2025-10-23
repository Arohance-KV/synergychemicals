// src/components/modals/OtpModal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { 
  submitLead, 
  verifyOtp, 
  clearOtpState,
  selectOtpSubmitData,
  selectOtpVerifySuccess,
  selectOtpLoading,
  selectOtpError 
} from '../../redux/otpSlice';

const OtpModal = ({ isOpen, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  
  // Redux state
  const submitData = useSelector(selectOtpSubmitData);
  const verifySuccess = useSelector(selectOtpVerifySuccess);
  const loading = useSelector(selectOtpLoading);
  const error = useSelector(selectOtpError);

  // Form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [otp, setOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);

  // Stable handleClose using useCallback
  const handleClose = useCallback(() => {
    setStep(1);
    setFormData({ firstName: '', lastName: '', phone: '' });
    setOtp('');
    setOtpInputs(['', '', '', '', '', '']);
    dispatch(clearOtpState());
    onClose();
  }, [dispatch, onClose]);

  // Stable success handler using useCallback (UPDATED: Clear state after onSuccess)
  const handleSuccessNavigation = useCallback(() => {
    console.log('OTP Verified Successfully! Navigating to products...');
    
    // Call the onSuccess callback to navigate and close modal
    if (onSuccess) {
      onSuccess();
    }
    
    // Clear Redux state shortly after (prevents re-triggers; brief delay for success msg flash)
    setTimeout(() => {
      dispatch(clearOtpState());
      console.log('Redux OTP state cleared after success');
    }, 100);
  }, [onSuccess, dispatch]);

  // Handle OTP verification success with stable dependencies
  useEffect(() => {
    if (verifySuccess) {
      console.log('useEffect triggered - verifySuccess is:', verifySuccess, 'Calling handleSuccessNavigation');
      handleSuccessNavigation();
    }
  }, [verifySuccess, handleSuccessNavigation]);

  // Auto-move to OTP step after successful submission
  useEffect(() => {
    if (submitData && step === 1) {
      console.log('OTP sent successfully! Moving to verification step...');
      setStep(2);
    }
  }, [submitData, step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    
    if (formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: `+91${formData.phone}`
    };
    
    console.log('Submitting lead with payload:', payload);
    dispatch(submitLead(payload));
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    setOtp(newOtpInputs.join(''));
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    
    console.log('Verifying OTP:', otp);
    
    dispatch(verifyOtp({ 
      phone: `+91${formData.phone}`, 
      otp 
    }));
  };

  const handleResendOtp = () => {
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: `+91${formData.phone}`
    };
    console.log('Resending OTP...');
    dispatch(submitLead(payload));
    setOtpInputs(['', '', '', '', '', '']);
    setOtp('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Step 1: User Details Form */}
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-[#32405B] mb-2">
              Welcome
            </h2>
            <p className="text-gray-600 mb-6">
              Please enter your details to view our products
            </p>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent outline-none transition-all"
                  placeholder="John"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent outline-none transition-all"
                  placeholder="Doe"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    maxLength="10"
                    className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent outline-none transition-all"
                    placeholder="9876543210"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter 10-digit mobile number
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6A00] text-white py-3 rounded-lg font-semibold hover:bg-[#e55f00] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: OTP Verification Form */}
        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold text-[#32405B] mb-2">
              Verify OTP
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a 6-digit code to <span className="font-semibold">+91{formData.phone}</span>
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-2">
                {otpInputs.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6A00] focus:border-[#FF6A00] outline-none transition-all"
                  />
                ))}
              </div>

              {/* Success Message */}
              {verifySuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center">
                  ✓ Verification successful! Redirecting...
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-[#FF6A00] text-white py-3 rounded-lg font-semibold hover:bg-[#e55f00] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-sm text-[#32405B] hover:text-[#FF6A00] font-medium transition-colors disabled:opacity-50"
                >
                  Didn't receive the code? Resend OTP
                </button>
              </div>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                ← Change Phone Number
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpModal;