import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      try {
        const res = await axios.post('http://localhost:8080/auth/forgot-password', { email });
        console.log(res)
        setStep(2);
      } catch (err) {
        console.error(err);
      }
    } else if (step === 2) {
      try {
        await axios.post('http://localhost:8080/auth/verify-otp', { email, otp });
        setStep(3);
      } catch (err) {
        console.error(err);
      }
    } else if (step === 3) {
      try {
        await axios.post('http://localhost:8080/auth/reset-password', { email, newPassword });
        alert('Password reset successful!');
        setStep(1);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="otp">
                OTP
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;