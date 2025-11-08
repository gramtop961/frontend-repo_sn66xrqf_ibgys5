import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
        <div className="text-white max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm">AI-powered screening</span>
          </div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Heart Disease Detection
            <span className="block text-cyan-300">Fast. Accurate. Secure.</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80">
            A modern clinical tool that predicts the likelihood of heart disease using a trained Random Forest model. Enter patient vitals and receive real-time risk estimates.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#predict" className="px-5 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition">Start Screening</a>
            <a href="#how" className="px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold transition">How it works</a>
          </div>
        </div>
      </div>
    </section>
  );
}
