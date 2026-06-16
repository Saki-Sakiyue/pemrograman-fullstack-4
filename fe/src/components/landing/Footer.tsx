'use client';

import { Beaker } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Beaker className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">Templas</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              © 2024 Templas. Built for creators. Elevating the standard of web design through community collaboration.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">PRODUCT</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                  Browse
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                  Submit
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">LEGAL</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 text-right">CONNECT</h3>
            <div className="flex justify-end gap-4">
              <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                Twitter
              </Link>
              <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                Discord
              </Link>
              <Link href="#" className="text-sm text-slate-600 hover:text-blue-600 transition">
                GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="pt-8 border-t border-slate-200 text-center">
          <p className="text-sm text-slate-500">
            Made with ❤️ by the Templas community
          </p>
        </div>
      </div>
    </footer>
  );
}