"use client";

import { useState } from "react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { log } from "console";

export default function MyAccount() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: registerEmail, password: registerPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Registration successful!");
        setRegisterEmail("");
        setRegisterPassword("");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        setLoginEmail("");
        setLoginPassword("");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-light text-center text-gray-800 mb-4" style={{ fontFamily: "Georgia, serif" }}>
          My account
        </h1>
        <p className="text-center text-sm text-gray-500 mb-16">
          <Link href="/" className="hover:text-[#2e8b4a] transition-colors">Home</Link> / <span className="text-gray-800 font-medium">My account</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Register Form */}
          <div>
            <h2 className="text-2xl font-light text-gray-800 mb-6" style={{ fontFamily: "Georgia, serif" }}>Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-600 font-medium">Email address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2e8b4a] transition-colors bg-white shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs text-gray-600 font-medium">Password <span className="text-red-500">*</span></label>
                <input 
                  type={showRegPwd ? "text" : "password"} 
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2e8b4a] transition-colors bg-white shadow-sm pr-10"
                />
                <button type="button" onClick={() => setShowRegPwd(!showRegPwd)} className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600">
                  {showRegPwd ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
              </p>
              <button 
                type="submit" 
                disabled={isRegistering}
                className="mt-2 bg-[#7eb693] hover:bg-[#689f7c] text-white font-bold tracking-widest uppercase text-xs py-3.5 px-6 rounded transition-colors"
                style={{ backgroundColor: "#7eb693" }}
              >
                {isRegistering ? "Registering..." : "REGISTER"}
              </button>
            </form>
          </div>

          {/* Login Form */}
          <div className="md:border-l md:border-gray-100 md:pl-12 lg:pl-24">
            <h2 className="text-2xl font-light text-gray-800 mb-6" style={{ fontFamily: "Georgia, serif" }}>Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-600 font-medium">Username or email address <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2e8b4a] transition-colors bg-white shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs text-gray-600 font-medium">Password <span className="text-red-500">*</span></label>
                <input 
                  type={showLoginPwd ? "text" : "password"} 
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-800 outline-none focus:border-[#2e8b4a] transition-colors bg-white shadow-sm pr-10"
                />
                <button type="button" onClick={() => setShowLoginPwd(!showLoginPwd)} className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600">
                  {showLoginPwd ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoggingIn}
                className="mt-4 bg-[#f8f8f8] hover:bg-gray-200 border border-gray-200 text-gray-800 font-bold tracking-widest uppercase text-xs py-3.5 px-6 rounded transition-colors inline-block w-fit"
              >
                {isLoggingIn ? "Logging in..." : "LOGIN"}
              </button>
              <div className="mt-2 text-xs text-[#2e8b4a] hover:underline cursor-pointer">
                Lost your password?
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
