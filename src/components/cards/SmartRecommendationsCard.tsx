import { MapPin, Navigation } from 'lucide-react';

export default function SmartRecommendationsCard() {
  const recommendations = [
    {
      type: 'gas',
      name: 'Shell Gas Station',
      distance: '0.3 mi',
      price: '$3.49/gal',
      open: true,
    },
    {
      type: 'coffee',
      name: 'Starbucks',
      distance: '0.5 mi',
      status: 'Open',
      open: true,
    },
  ];

  return (
    <div className="glass rounded-2xl p-5 card-hover">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Nearby</h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-white/90">{rec.name}</p>
                <p className="text-sm text-white/60 mt-1">{rec.distance}</p>
              </div>
              {rec.open && (
                <span className="text-xs bg-status-excellent/20 text-status-excellent px-2.5 py-1 rounded-lg font-semibold border border-status-excellent/30">
                  Open
                </span>
              )}
            </div>
            {rec.price && <p className="text-sm text-white/80 mb-3 font-medium">{rec.price}</p>}
            <button 
              onClick={() => {
                // In a real app, this would open navigation
                alert(`Navigating to ${rec.name}...`);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all text-sm font-semibold border border-green-500/30"
            >
              <Navigation className="w-4 h-4" />
              Navigate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



