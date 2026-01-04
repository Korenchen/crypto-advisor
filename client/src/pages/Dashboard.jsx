import { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown, TrendingUp, Newspaper, Brain, Image as ImageIcon } from 'lucide-react';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleVote = async (section, vote) => {
    try {
      await api.post('/vote', { section, vote });
      alert(`Thanks for the feedback on our ${section} section!`);
    } catch (err) {
      console.error("Vote failed");
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading your personalized insights...</div>;
  if (!data) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Error loading dashboard.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-400">Your Crypto Advisor</h1>
        <button onClick={() => { localStorage.clear(); window.location.href='/login'; }} className="text-sm text-gray-400 hover:text-white">Logout</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Prices */}
        <DashboardCard title="Market Prices" icon={<TrendingUp size={20}/>} onVote={(v) => handleVote('prices', v)}>
          <div className="space-y-3">
            {Object.entries(data.prices).map(([coin, price]) => (
              <div key={coin} className="flex justify-between p-2 bg-gray-700/50 rounded-lg">
                <span className="capitalize">{coin}</span>
                <span className="font-mono text-green-400">${price.usd.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        {/* Section 2: News */}
        <DashboardCard title="Market News" icon={<Newspaper size={20}/>} onVote={(v) => handleVote('news', v)}>
          <div className="space-y-4 text-sm">
            {data.news.map((item, idx) => (
              <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="block hover:text-blue-400 border-b border-gray-700 pb-2">
                {item.title}
              </a>
            ))}
          </div>
        </DashboardCard>

        {/* Section 3: AI Insight */}
        <DashboardCard title="AI Insight of the Day" icon={<Brain size={20}/>} onVote={(v) => handleVote('ai', v)}>
            <div className="prose prose-invert prose-sm ">
                <ReactMarkdown>{data.aiInsight}</ReactMarkdown>
            </div>
        </DashboardCard>

        {/* Section 4: Fun Meme */}
        <DashboardCard title="Community Meme" icon={<ImageIcon size={20}/>} onVote={(v) => handleVote('meme', v)}>
          <img src={data.meme} alt="Crypto Meme" className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300" />
        </DashboardCard>
      </div>
    </div>
  );
}


function DashboardCard({ title, icon, children, onVote }) {
  return (
    <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-xl flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider text-sm">
          {icon} {title}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onVote(1)} className="p-1 hover:text-green-400 transition-colors"><ThumbsUp size={18}/></button>
          <button onClick={() => onVote(-1)} className="p-1 hover:text-red-400 transition-colors"><ThumbsDown size={18}/></button>
        </div>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}