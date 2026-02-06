
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StandingsTable from './components/StandingsTable';
import LapRecordChart from './components/LapRecordChart';
import InfoBox from './components/InfoBox';
import { fetchF1Data } from './services/geminiService';
import { F1DataState, CircuitData } from './types';
import { Timer, Map, ExternalLink, Activity, Zap, AlertCircle, Compass, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<F1DataState>({
    standings: [],
    circuits: [],
    sources: [],
    isLoading: true,
    error: null,
  });
  const [selectedCircuit, setSelectedCircuit] = useState<CircuitData | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { data, sources } = await fetchF1Data();
        setState({
          standings: data.standings || [],
          circuits: data.circuits || [],
          sources: sources || [],
          isLoading: false,
          error: null,
        });
        if (data.circuits?.length > 0) {
          setSelectedCircuit(data.circuits[0]);
        }
      } catch (err) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: "System Synchronization Interrupted. Re-authenticating..." 
        }));
      }
    };
    init();
  }, []);

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin mb-8" />
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#191919]">
          Calibrating Systems
        </h2>
        <p className="text-gray-400 text-[10px] mt-4 uppercase tracking-[0.2em]">Engineering Excellence Since 2024</p>
      </div>
    );
  }

  const leader = state.standings[0];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        {state.error && (
          <div className="bg-red-50 border border-red-100 text-[#e10600] p-5 rounded-sm mb-12 flex items-center gap-4">
            <AlertCircle className="w-5 h-5" />
            <p className="text-[11px] font-bold uppercase tracking-wider">{state.error}</p>
          </div>
        )}

        {/* Hero Concept Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-1 px-1 bg-gray-50 rounded-sm mb-20 overflow-hidden">
          <div className="lg:col-span-8 relative min-h-[600px] group bg-white">
            <img 
              src={leader?.imageUrl || "https://picsum.photos/seed/f1leader/1200/800"} 
              alt={leader?.name} 
              className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-[1.02]"
              onError={(e) => (e.target as HTMLImageElement).src = "https://picsum.photos/seed/race/1200/800"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 text-white z-20">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-white" /> Official Rankings
              </div>
              <h1 className="text-7xl font-bold tracking-tighter uppercase leading-none mb-6">
                Peak <br /> Performance
              </h1>
              <div className="flex items-center gap-6">
                 <button className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-8 py-4 hover:bg-[#e10600] hover:text-white transition-all rounded-sm">
                   View Stats
                 </button>
                 <div className="flex flex-col">
                   <span className="text-[9px] uppercase tracking-widest text-white/60 font-bold">Championship Leader</span>
                   <span className="text-lg font-bold">{leader?.name}</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-1">
            <div className="bg-white p-10 flex-1 flex flex-col justify-center">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#191919] mb-6 flex items-center gap-2">
                <Compass className="w-4 h-4" /> Strategic Guide
              </h3>
              <div className="space-y-6">
                <InfoBox term="The Paddock" />
                <InfoBox term="The Apex" />
              </div>
            </div>
            <div className="bg-[#191919] p-10 text-white flex flex-col justify-between group">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-[#e10600]">Technical Brief</h3>
                <p className="text-lg font-light leading-relaxed text-gray-400">
                  Every millisecond is a product of thousands of hours of <span className="text-white font-medium">aerodynamic simulation</span> and tire management analysis.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mt-8 cursor-pointer group-hover:text-[#e10600] transition-colors">
                Explore Technology <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Driver Standings Column */}
          <div className="lg:col-span-4" id="leaderboard">
            <StandingsTable drivers={state.standings} />
            <div className="mt-12 p-8 bg-gray-50 border border-gray-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-4">Constructor Outlook</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                The current season shows an unprecedented narrowing of the performance window between the top three teams.
              </p>
            </div>
          </div>

          {/* Circuit Details Column */}
          <div className="lg:col-span-8" id="records">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b porsche-border pb-8">
              <div>
                <h2 className="text-4xl font-light tracking-tight text-[#191919] mb-2 italic">Circuits & Telemetry</h2>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-medium">World Class Proving Grounds</p>
              </div>
              
              <div className="flex flex-col items-start gap-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Select Track</label>
                <select 
                  className="bg-white border-b-2 border-black text-black px-0 py-2 text-sm font-bold focus:outline-none transition-all cursor-pointer hover:border-[#e10600] min-w-[240px]"
                  value={selectedCircuit?.name || ''}
                  onChange={(e) => {
                    const c = state.circuits.find(circ => circ.name === e.target.value);
                    if (c) setSelectedCircuit(c);
                  }}
                >
                  {state.circuits.map(c => (
                    <option key={c.name} value={c.name}>{c.name.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedCircuit && (
              <div className="space-y-16 animate-in fade-in duration-700">
                {/* Visual Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="bg-[#f8f8f8] p-12 rounded-sm flex items-center justify-center min-h-[400px]">
                    {selectedCircuit.trackMapUrl ? (
                      <img 
                        src={selectedCircuit.trackMapUrl} 
                        alt={selectedCircuit.name}
                        className="max-h-[300px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                        onError={(e) => (e.target as HTMLImageElement).classList.add('hidden')}
                      />
                    ) : (
                      <div className="text-center">
                        <Activity className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                        <span className="text-[10px] uppercase font-bold text-gray-300">Layout Telemetry Unavailable</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center space-y-10">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e10600] mb-2 block">Specifications</span>
                      <h3 className="text-3xl font-bold tracking-tighter uppercase italic">{selectedCircuit.name}</h3>
                      <p className="text-sm text-gray-500 mt-2">{selectedCircuit.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="border-t porsche-border pt-4">
                        <span className="text-[9px] font-bold uppercase text-gray-400 tracking-widest block mb-1">Length</span>
                        <span className="text-xl font-black">{selectedCircuit.length}</span>
                      </div>
                      <div className="border-t porsche-border pt-4">
                        <span className="text-[9px] font-bold uppercase text-gray-400 tracking-widest block mb-1">Lap Record</span>
                        <span className="text-xl font-black text-[#e10600]">{selectedCircuit.records[0]?.time}</span>
                      </div>
                      <div className="border-t porsche-border pt-4">
                        <span className="text-[9px] font-bold uppercase text-gray-400 tracking-widest block mb-1">Driver</span>
                        <span className="text-sm font-bold uppercase">{selectedCircuit.records[0]?.driver}</span>
                      </div>
                      <div className="border-t porsche-border pt-4">
                        <span className="text-[9px] font-bold uppercase text-gray-400 tracking-widest block mb-1">Year</span>
                        <span className="text-sm font-bold">{selectedCircuit.records[0]?.year}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Chart Section */}
                <div className="bg-white border porsche-border p-10 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-[0.3em]">Efficiency Evolution</h4>
                      <p className="text-[10px] text-gray-400 uppercase mt-1">Historic Performance Metrics</p>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#e10600] flex items-center gap-2">
                       <Zap className="w-3 h-3" /> System Live
                    </div>
                  </div>
                  <LapRecordChart circuit={selectedCircuit} />
                </div>

                {/* Footer Insight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-[#191919] text-white p-10 flex flex-col justify-between min-h-[240px]">
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Chassis Dynamics</h5>
                      <p className="text-lg font-light leading-snug">
                        Mastering {selectedCircuit.name} requires a setup that balances high-speed stability with low-speed mechanical grip.
                      </p>
                      <button className="text-[9px] font-black uppercase tracking-widest border border-white/20 w-max px-4 py-2 hover:bg-white hover:text-black transition-all">
                        Setup Guide
                      </button>
                   </div>
                   <div className="bg-gray-50 p-10 flex flex-col justify-center border porsche-border">
                      <p className="text-xs text-gray-500 italic leading-relaxed">
                        "The pursuit of the perfect lap is a constant battle against physics. This circuit provides the ultimate test of both man and machine."
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                         <div className="w-8 h-[1px] bg-black" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Engineering Report</span>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Global Footer */}
        <footer className="mt-32 pt-16 border-t porsche-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
             <div className="col-span-1 md:col-span-1">
                <span className="f1-font text-lg font-black tracking-tighter uppercase italic text-[#191919]">
                  F1 <span className="text-[#e10600]">VELOCITY</span>
                </span>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-4 leading-loose">
                  Precision Telemetry <br /> Performance Engineering <br /> Rookie Education
                </p>
             </div>
             <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2">Sources</span>
                {state.sources.slice(0, 3).map((source, i) => (
                  <a key={i} href={source.uri} target="_blank" className="text-[11px] font-bold text-gray-500 hover:text-black transition-colors truncate">
                    {source.title}
                  </a>
                ))}
             </div>
             <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2">Social</span>
                <a href="#" className="text-[11px] font-bold text-gray-500 hover:text-black transition-colors">Instagram</a>
                <a href="#" className="text-[11px] font-bold text-gray-500 hover:text-black transition-colors">Twitter</a>
             </div>
             <div className="flex flex-col gap-4 items-start md:items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2">Legal</span>
                <span className="text-[11px] text-gray-400 font-medium">&copy; 2024 F1 Velocity Hub</span>
                <span className="text-[9px] text-gray-300 font-medium uppercase tracking-widest">Powered by Gemini AI</span>
             </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
