#  Crypto Advisor: Personalized Market Dashboard

A full-stack web application that provides tailored cryptocurrency insights, real-time market data, and AI-generated advice based on unique user personas.

## 🌟 Features
- **Persona-Based Onboarding**: Tailors content for "HODLers," "Day Traders," or "NFT Collectors."
- **AI-Powered Insights**: Uses LLMs (via OpenRouter) to generate specific market advice for your chosen assets.
- **Real-Time Data**: Integrated with **CoinGecko** for live prices and **CryptoPanic** for market news.
- **Interactive Dashboard**: Modern, responsive UI with a community meme section and voting system.
- **Secure Auth**: JWT-based authentication with local SQLite storage.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS v4, Lucide React.
- **Backend**: Node.js, Express.js.
- **Database**: SQLite.
- **APIs**: OpenRouter (AI), CoinGecko (Prices), CryptoPanic (News), Reddit (Memes).

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Korenchen/crypto-advisor.git](https://github.com/Korenchen/crypto-advisor.git)
cd crypto-advisor
```
### 2. Backend setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder
```bash
PORT=5000
JWT_SECRET=your_secret_key
OPENROUTER_API_KEY=your_key_here
CRYPTOPANIC_API_KEY=your_key_here
```
### 3. Frontend Setup
```bash
cd ../clent
npm install
```
Run the app: `npm run dev`
