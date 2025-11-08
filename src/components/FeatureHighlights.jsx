import { ShieldCheck, Activity, Cpu, Lock } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Clinical Inputs',
    desc: 'Age, sex, chest pain type, resting bp, cholesterol, fasting blood sugar, restecg, thalach, exercise angina, oldpeak, slope, ca, thal.'
  },
  {
    icon: Cpu,
    title: 'ML Model',
    desc: 'Random Forest classifier trained on curated dataset with cross-validation and robust preprocessing.'
  },
  {
    icon: ShieldCheck,
    title: 'Confidence Score',
    desc: 'Get probability estimates along with clear interpretation and color-coded feedback.'
  },
  {
    icon: Lock,
    title: 'Privacy First',
    desc: 'All predictions handled securely with no data shared externally.'
  }
];

export default function FeatureHighlights() {
  return (
    <section id="how" className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Why this tool</h2>
        <p className="text-slate-600 mt-2 max-w-2xl">Built for clinicians and researchers who want fast, interpretable risk screening with a modern experience.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
              <p className="text-slate-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
