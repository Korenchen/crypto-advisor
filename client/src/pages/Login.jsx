import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
    
      localStorage.setItem('token', res.data.token);
      
     
      if (res.data.user.hasPreferences) {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="email" placeholder="Email" className="w-full bg-gray-700 border-none rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="password" placeholder="Password" className="w-full bg-gray-700 border-none rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200">
            Login <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}