'use client';

import { Beaker } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-6 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <Beaker className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">Templas</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              © 2024 Templas. Built for creators. Elevating the standard of web
              design through community collaboration.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900">PRODUCT</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition hover:text-blue-600"
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition hover:text-blue-600"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition hover:text-blue-600"
                >
                  Submit
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-slate-900">LEGAL</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition hover:text-blue-600"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition hover:text-blue-600"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 transition hover:text-blue-600"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-right text-sm font-bold text-slate-900">
              CONNECT
            </h3>
            <div className="flex justify-end gap-4">
              <Link
                href="#"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                Discord
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-600 transition hover:text-blue-600"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">
            Made with ❤️ by the Templas community
          </p>
        </div>
      </div>
    </footer>
  );
}
