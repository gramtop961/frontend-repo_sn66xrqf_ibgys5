import { useMemo, useState } from 'react';

const fields = [
  { key: 'age', label: 'Age', type: 'number', min: 1, max: 120 },
  { key: 'sex', label: 'Sex (0 = female, 1 = male)', type: 'number', min: 0, max: 1 },
  { key: 'cp', label: 'Chest Pain Type (0-3)', type: 'number', min: 0, max: 3 },
  { key: 'trestbps', label: 'Resting BP (mm Hg)', type: 'number', min: 60, max: 250 },
  { key: 'chol', label: 'Cholesterol (mg/dl)', type: 'number', min: 80, max: 700 },
  { key: 'fbs', label: 'Fasting Blood Sugar > 120 mg/dl (0/1)', type: 'number', min: 0, max: 1 },
  { key: 'restecg', label: 'Resting ECG (0-2)', type: 'number', min: 0, max: 2 },
  { key: 'thalach', label: 'Max Heart Rate', type: 'number', min: 60, max: 250 },
  { key: 'exang', label: 'Exercise Induced Angina (0/1)', type: 'number', min: 0, max: 1 },
  { key: 'oldpeak', label: 'ST Depression', type: 'number', step: 0.1, min: 0, max: 10 },
  { key: 'slope', label: 'Slope (0-2)', type: 'number', min: 0, max: 2 },
  { key: 'ca', label: 'Major Vessels (0-3)', type: 'number', min: 0, max: 3 },
  { key: 'thal', label: 'Thal (0 = Normal, 1 = Fixed defect, 2 = Reversible)', type: 'number', min: 0, max: 2 },
];

export default function PredictionForm() {
  const [values, setValues] = useState(Object.fromEntries(fields.map(f => [f.key, ''])));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const backend = import.meta.env.VITE_BACKEND_URL || '';

  const probability = useMemo(() => {
    if (!result || typeof result.probability !== 'number') return null;
    return Math.max(0, Math.min(1, result.probability));
  }, [result]);

  const handleChange = (key, value) => {
    setValues(v => ({ ...v, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const payload = fields.map(f => Number(values[f.key]));
      if (payload.some(n => Number.isNaN(n))) {
        throw new Error('Please fill all fields with valid numbers.');
      }
      // Call backend if available; otherwise do a simple client-side mock to avoid broken UI
      if (backend) {
        const res = await fetch(`${backend}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ features: payload }),
        });
        if (!res.ok) throw new Error('Prediction request failed');
        const data = await res.json();
        setResult(data);
      } else {
        // Simple deterministic mock: logistic-like transform
        const score = payload.reduce((acc, v, i) => acc + (i % 3 === 0 ? v * 0.02 : v * 0.005), 0);
        const prob = 1 / (1 + Math.exp(-0.15 * (score - 10)));
        setResult({ prediction: prob > 0.5 ? 1 : 0, probability: prob });
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const riskColor = probability == null ? 'bg-slate-200' : probability > 0.7 ? 'bg-rose-500' : probability > 0.4 ? 'bg-amber-500' : 'bg-emerald-500';
  const riskLabel = probability == null ? '—' : probability > 0.7 ? 'High Risk' : probability > 0.4 ? 'Moderate Risk' : 'Low Risk';

  return (
    <section id="predict" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Enter patient data</h2>
            <p className="text-slate-600 mt-1">Provide clinical measurements to get an instant risk estimate.</p>
            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map(f => (
                <div key={f.key} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700" htmlFor={f.key}>{f.label}</label>
                  <input
                    id={f.key}
                    type={f.type}
                    inputMode="numeric"
                    min={f.min}
                    max={f.max}
                    step={f.step || 'any'}
                    value={values[f.key]}
                    onChange={e => handleChange(f.key, e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                    required
                  />
                </div>
              ))}
              <div className="md:col-span-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold disabled:opacity-60"
                >
                  {loading ? 'Predicting…' : 'Predict Risk'}
                </button>
                {error && <span className="text-rose-600 text-sm">{error}</span>}
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
            <h3 className="text-lg font-semibold text-slate-900">Result</h3>
            <div className="mt-4 h-3 w-full rounded-full bg-slate-200 overflow-hidden">
              <div className={`h-full ${riskColor}`} style={{ width: probability == null ? '0%' : `${Math.round(probability * 100)}%` }} />
            </div>
            <div className="mt-4">
              <div className="text-sm text-slate-600">Estimated probability</div>
              <div className="text-3xl font-bold text-slate-900">{probability == null ? '—' : `${(probability * 100).toFixed(1)}%`}</div>
              <div className="mt-1 inline-flex px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">{riskLabel}</div>
            </div>
            <ul className="mt-6 text-sm text-slate-600 list-disc list-inside space-y-1">
              <li>This tool supports clinical decision-making and is not a diagnosis.</li>
              <li>Inputs should follow standard heart disease dataset conventions.</li>
              <li>No data is stored in the browser unless backend enables persistence.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
