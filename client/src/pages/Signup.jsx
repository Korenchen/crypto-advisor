import { useState } from 'react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../services/api'; 
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await api.post('/auth/signup', formData);
      alert("Account created successfully! Redirecting to login...");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-400">Join the Future</h2>
          <p className="text-gray-400 mt-2">Get personalized AI crypto insights daily.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input 
              type="text" placeholder="Full Name" required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input 
              type="email" placeholder="Email Address" required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <input 
              type="password" placeholder="Secure Password" required
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
            Create Account <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already a member? <Link to="/login" className="text-blue-400 hover:underline font-medium">Log In</Link>
        </p>
      </div>
    </div>
  );
}