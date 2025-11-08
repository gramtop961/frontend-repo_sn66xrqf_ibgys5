export default function Footer() {
  return (
    <footer className="py-10 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">© {new Date().getFullYear()} CardioSight AI. All rights reserved.</div>
        <div className="text-sm opacity-80">Model: Random Forest • Designed for educational and research use</div>
      </div>
    </footer>
  );
}
