import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CheckCircle } from 'lucide-react';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({
    assets: [],
    investorType: '',
    contentType: ''
  });
  const navigate = useNavigate();

  // Logic to allow multiple asset selection
  const toggleAsset = (coin) => {
    if (prefs.assets.includes(coin)) {
      setPrefs({ ...prefs, assets: prefs.assets.filter(a => a !== coin) });
    } else {
      setPrefs({ ...prefs, assets: [...prefs.assets, coin] });
    }
  };

  const handleFinish = async () => {
    try {
      await api.post('/user/preferences', prefs);
      navigate('/dashboard');
    } catch (err) {
      alert("Error saving preferences. Make sure your server is running.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
        
        {/* Step 1: Multiple Assets  */}
        {step === 1 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-2">Which assets interest you?</h2>
            <p className="text-gray-400 mb-6 text-sm">Select all that apply.</p>
            <div className="grid grid-cols-2 gap-3">
              {['bitcoin', 'ethereum', 'solana', 'cardano', 'ripple', 'dogecoin'].map(coin => (
                <button 
                  key={coin}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${prefs.assets.includes(coin) ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-400'}`}
                  onClick={() => toggleAsset(coin)}
                >
                  {coin.toUpperCase()}
                  {prefs.assets.includes(coin) && <CheckCircle size={16} />}
                </button>
              ))}
            </div>
            <button 
              disabled={prefs.assets.length === 0}
              onClick={() => setStep(2)} 
              className="mt-8 w-full bg-blue-500 disabled:opacity-50 py-3 rounded-xl font-bold hover:bg-blue-400 transition-colors"
            >
              Next Step
            </button>
          </div>
        )}

        {/* Step 2: Investor Type */}
        {step === 2 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-6">What type of investor are you?</h2>
            <div className="space-y-3">
              {['HODLer', 'Day Trader', 'NFT Collector'].map(type => (
                <button 
                  key={type}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${prefs.investorType === type ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-400'}`}
                  onClick={() => setPrefs({...prefs, investorType: type})}
                >
                  {type}
                </button>
              ))}
            </div>
            <button 
              disabled={!prefs.investorType}
              onClick={() => setStep(3)} 
              className="mt-8 w-full bg-blue-500 disabled:opacity-50 py-3 rounded-xl font-bold hover:bg-blue-400 transition-colors"
            >
              One More Step
            </button>
          </div>
        )}

        {/* Step 3: Content Preference  */}
        {step === 3 && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold mb-6">What content do you prefer?</h2>
            <div className="grid grid-cols-2 gap-3">
              {['Market News', 'Charts', 'Social', 'Fun'].map(content => (
                <button 
                  key={content}
                  className={`p-4 rounded-xl border text-center transition-all ${prefs.contentType === content ? 'bg-blue-600 border-blue-400' : 'bg-gray-700 border-gray-600 hover:border-gray-400'}`}
                  onClick={() => setPrefs({...prefs, contentType: content})}
                >
                  {content}
                </button>
              ))}
            </div>
            <button 
              disabled={!prefs.contentType}
              onClick={handleFinish} 
              className="mt-8 w-full bg-green-600 disabled:opacity-50 py-3 rounded-xl font-bold hover:bg-green-500 transition-colors"
            >
              Finish & See Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}