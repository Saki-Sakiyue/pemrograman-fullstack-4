'use client';

import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import { setCookie } from 'cookies-next';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
  ArrowRight,
  Beaker,
  Download,
  Eye,
  EyeOff,
  Heart,
  LayoutDashboard,
  Loader2,
  Lock,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

// ─── Types ───────────────────────────────────────────────────────────────────
interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

// ─── Hook: Count-Up Animation ─────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500, startDelay = 400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, startDelay]);

  return value;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('redirect') || '/dashboard';
  const setUser = useAuthStore(state => state.setUser);

  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Feature 9: Ripple
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const rippleId = useRef(0);

  // Feature 6: Parallax
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Feature 5: Count-up
  const templateCount = useCountUp(12, 1200, 500);
  const upvoteCount = useCountUp(450, 1400, 600);
  const downloadCount = useCountUp(1284, 1600, 700);

  // ── Parallax mouse handler ─────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = leftPanelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setMouse({
      x: (e.clientX - rect.left - cx) / cx,
      y: (e.clientY - rect.top - cy) / cy,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
  }, []);

  // ── Ripple handler ─────────────────────────────────────────────────────────
  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      const id = rippleId.current++;
      setRipples(prev => [
        ...prev,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top, size },
      ]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    },
    []
  );

  // ── Login logic ────────────────────────────────────────────────────────────
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.login({
        identifier: username,
        password,
      });
      if (response.data) {
        setCookie('templas_token', response.data.token, {
          path: '/',
          maxAge: 60 * 60 * 5,
        });
        setUser(response.data.user);
        toast.success('Login berhasil! Selamat datang kembali.');
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Gagal login. Periksa kembali kredensial Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Framer Motion variants ─────────────────────────────────────────────────
  const formContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const formItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  return (
    <>
      {/* ── Main Layout ───────────────────────────────────────────────────── */}
      <div className="flex min-h-screen w-full bg-white font-sans">
        {/* ── Left Panel ──────────────────────────────────────────────────── */}
        <div
          ref={leftPanelRef}
          className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-12 lg:flex"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Glow blobs — parallax layer 1 */}
          <div
            className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[80px]"
            style={{
              transform: `translate(${mouse.x * 18}px, ${mouse.y * 18}px)`,
              transition: 'transform 0.12s ease-out',
            }}
          />
          <div
            className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-[80px]"
            style={{
              transform: `translate(${-mouse.x * 18}px, ${-mouse.y * 18}px)`,
              transition: 'transform 0.12s ease-out',
            }}
          />

          {/* Brand — parallax layer 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex items-center text-2xl font-bold tracking-wide text-white"
            style={{
              transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)`,
              transition: 'transform 0.12s ease-out',
            }}
          >
            <Beaker className="mr-3 h-8 w-8 text-blue-500" />
            Templas
          </motion.div>

          {/* Hero + Cards — parallax layer 3 */}
          <div
            className="relative z-10 mx-auto w-full max-w-md"
            style={{
              transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
              transition: 'transform 0.12s ease-out',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-4xl leading-tight font-extrabold text-white">
                Eksplorasi & Simpan <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Template Terbaikmu.
                </span>
              </h2>
              <p className="mt-4 text-slate-400">
                Kelola aset, pantau unduhan, dan temukan inspirasi desain baru
                setiap harinya.
              </p>
            </motion.div>

            {/* Floating stat cards */}
            <div className="relative h-64 w-full">
              {/* Card 1 — Total Template */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-0 left-0"
                style={{
                  transform: `translate(${mouse.x * 14}px, ${mouse.y * 14}px)`,
                  transition: 'transform 0.12s ease-out',
                }}
              >
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <LayoutDashboard size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Total Template
                    </p>
                    <p className="text-lg font-bold text-white">
                      {templateCount} Aset
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 — Upvotes */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute top-20 right-0"
                style={{
                  transform: `translate(${mouse.x * 18}px, ${mouse.y * 18}px)`,
                  transition: 'transform 0.12s ease-out',
                }}
              >
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                    <Heart size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Upvotes
                    </p>
                    <p className="text-lg font-bold text-white">
                      {upvoteCount.toLocaleString('id-ID')} Suka
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 — Downloads */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="absolute bottom-0 left-10"
                style={{
                  transform: `translate(${mouse.x * 22}px, ${mouse.y * 22}px)`,
                  transition: 'transform 0.12s ease-out',
                }}
              >
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Download size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-300">
                      Downloads
                    </p>
                    <p className="text-lg font-bold text-white">
                      {downloadCount.toLocaleString('id-ID')} Kali
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 text-sm text-slate-500">
            © {new Date().getFullYear()} Templas V2. All rights reserved.
          </div>
        </div>

        {/* ── Right Panel (Form) ─────────────────────────────────────────── */}
        <div className="flex w-full items-center justify-center bg-gray-50 p-8 lg:w-1/2">
          <div className="w-full max-w-md">
            {/* Mobile header */}
            <div className="mb-8 flex items-center justify-center text-2xl font-bold tracking-wide text-slate-900 lg:hidden">
              <Beaker className="mr-2 h-8 w-8 text-blue-600" />
              Templas V2
            </div>

            <motion.div
              variants={formContainer}
              initial="hidden"
              animate="show"
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <motion.div variants={formItem} className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                  Selamat Datang 👋
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Silakan masuk ke akun Anda untuk melanjutkan ke dashboard.
                </p>
              </motion.div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username */}
                <motion.div variants={formItem} className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">
                    Username / Email
                  </label>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:outline-none"
                      placeholder="Masukkan username atau email"
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div variants={formItem} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Lupa password?
                    </Link>
                  </div>
                  <div className="group relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 transition-colors group-focus-within:text-blue-600">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-12 pl-10 text-slate-900 transition-all placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 focus:outline-none"
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Submit button with ripple */}
                <motion.div variants={formItem} className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleButtonClick}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
                  >
                    {/* Ripple elements */}
                    <AnimatePresence>
                      {ripples.map(r => (
                        <motion.span
                          key={r.id}
                          className="pointer-events-none absolute rounded-full bg-white/30"
                          style={{
                            width: r.size,
                            height: r.size,
                            top: r.y - r.size / 2,
                            left: r.x - r.size / 2,
                          }}
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 1, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.55, ease: 'easeOut' }}
                        />
                      ))}
                    </AnimatePresence>

                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Memproses...</span>
                      </>
                    ) : (
                      <>
                        <span>Masuk ke Dashboard</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>

              <motion.p
                variants={formItem}
                className="mt-8 text-center text-sm text-slate-500"
              >
                Belum punya akun?{' '}
                <Link
                  href="/register"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Daftar sekarang
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Tailwind: konfeti animation (tambahkan di tailwind.config.js) ── */}
      {/*
        Tambahkan di tailwind.config.js → theme.extend.keyframes & animation:

        keyframes: {
          confettiFall: {
            to: { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
          },
        },
        animation: {
          '[confettiFall_linear_forwards]': 'confettiFall linear forwards',
        },
      */}
    </>
  );
}
