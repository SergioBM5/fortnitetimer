import { useState, useEffect } from 'react';
import { Timer, Gamepad2, Calendar} from 'lucide-react';
import { AdBanner } from './components/AdBanner';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function App() {
  const targetDate = new Date('2025-11-28T00:00:00Z');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white font-['Orbitron'] overflow-hidden">
      {/* Hex Background */}
      <div className="hex-background"></div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', transform: 'translate(-50%, -50%)' }}></div>
      </div>

      {/* Top Ad Banner */}
      <div className="relative w-full bg-gradient-to-b from-gray-900/80 to-transparent border-b border-cyan-500/30 py-3 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-4">
          <AdBanner slotId="1234567890" format="horizontal" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Ad - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <AdBanner slotId="0987654321" format="vertical" />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <header className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6 float">
                <div className="relative">
                  <Gamepad2 className="w-16 h-16 text-cyan-400 pulse-glow-text" />
                </div>
                <h1 className="text-5xl md:text-7xl font-black cyber-pulse-text tracking-wider">
                  FORTNITE
                </h1>
              </div>
              <p className="text-lg md:text-2xl text-cyan-300 flex items-center justify-center gap-2 mb-2">
                <Timer className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
                CUENTA REGRESIVA
              </p>
              <p className="text-sm md:text-base text-gray-400 font-light">Fin de Temporada en Tiempo Real</p>
            </header>

            {/* Countdown Timer */}
            {!timeLeft.expired ? (
              <div className="gaming-card border-2 border-cyan-500/60 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm mb-10 glow-effect">
                <div className="shimmer-line"></div>

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Calendar className="w-6 h-6 text-blue-400 animate-bounce" />
                    <p className="text-lg md:text-xl text-cyan-300 font-semibold">La temporada termina el:</p>
                  </div>
                  <p className="text-3xl md:text-4xl font-black text-cyan-400 neon-text">
                    28 de Noviembre, 2025
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
                  {[
                    { label: 'DÍAS', key: 'days', color: 'from-cyan-500 to-blue-500', icon: '📅' },
                    { label: 'HORAS', key: 'hours', color: 'from-blue-500 to-purple-500', icon: '⏰' },
                    { label: 'MINUTOS', key: 'minutes', color: 'from-purple-500 to-pink-500', icon: '⏱️' },
                    { label: 'SEGUNDOS', key: 'seconds', color: 'from-pink-500 to-red-500', icon: '⚡' },
                  ].map((item) => (
                    <div key={item.label} className="relative group perspective">
                      <div className={`relative bg-gradient-to-br ${item.color} p-0.5 rounded-2xl`}>
                        <div className="bg-gradient-to-br from-gray-900/95 to-gray-950/95 rounded-2xl p-6 border border-gray-700/50 group-hover:border-cyan-400/50 transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-2">
                          <div className="text-center">
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <div className="text-6xl md:text-7xl font-black mb-3 bg-gradient-to-br bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                              <div className={`bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>
                                {String(timeLeft[item.key as keyof TimeLeft] || 0).padStart(2, '0')}
                              </div>
                            </div>
                            <div className="text-xs md:text-sm font-bold text-gray-400 tracking-widest">
                              {item.label}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-30 rounded-2xl blur-2xl transition-opacity duration-300`}></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="gaming-card border-2 border-yellow-500/60 rounded-2xl p-12 shadow-2xl backdrop-blur-sm mb-10 glow-effect text-center bg-gradient-to-br from-yellow-900/30 to-red-900/30">
                <h2 className="text-5xl md:text-7xl font-black mb-6 cyber-pulse-text">
                  ¡TEMPORADA TERMINADA!
                </h2>
                <p className="text-xl text-gray-300 mb-8">La nueva temporada está disponible</p>
                <a
                  href="https://www.fortnite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-yellow-500/50 text-lg"
                >
                  ¡ ACCEDER AHORA !
                </a>
              </div>
            )}

            {/* Bottom Ad */}
            <AdBanner slotId="5555555555" format="horizontal" />
          </main>

          {/* Sidebar Ad - Desktop Right */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <AdBanner slotId="1111111111" format="vertical" />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-cyan-500/20 mt-12 py-8 text-center z-10 backdrop-blur-sm">
        <p className="text-gray-400 text-sm mb-2">Contador no oficial de Fortnite</p>
        <p className="text-gray-500 text-xs">Fortnite es marca registrada de Epic Games, Inc.</p>
      </footer>
    </div>
  );
}

export default App;
