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
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-green-light" />
        <h3 className="text-lg font-semibold">Nearby</h3>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-white/5 rounded p-3">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium">{rec.name}</p>
                <p className="text-sm text-white/60">{rec.distance}</p>
              </div>
              {rec.open && (
                <span className="text-xs bg-status-excellent/20 text-status-excellent px-2 py-1 rounded">
                  Open
                </span>
              )}
            </div>
            {rec.price && <p className="text-sm text-white/80 mb-2">{rec.price}</p>}
            <button className="w-full flex items-center justify-center gap-2 p-2 bg-green-light/20 text-green-light rounded hover:bg-green-light/30 transition-all text-sm">
              <Navigation className="w-4 h-4" />
              Navigate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}



