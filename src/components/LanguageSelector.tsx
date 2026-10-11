'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' }
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<LanguageOption>(LANGUAGES[0]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,doi,ur,pa,bn,fr,es,de,gu,mr,ta,te,kn,ml',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      };
    }
  }, []);

  const changeLanguage = (lang: LanguageOption) => {
    setCurrentLang(lang);
    setIsOpen(false);

    if (typeof window !== 'undefined') {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = lang.code === 'doi' ? 'hi' : lang.code;
        selectEl.dispatchEvent(new Event('change'));
      }
    }
  };

  return (
    <div className="relative inline-block text-left z-50">
      
      {/* Hidden Google Translate container element */}
      <div id="google-translate-element" className="hidden" />

      {/* Header Language Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-mint-pale hover:bg-emerald-100 text-teal-dark border border-divider hover:border-teal-accent text-xs font-semibold transition-all shadow-2xs"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-teal-accent shrink-0" />
        <span>{currentLang.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-charcoal-light transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Language Selection Dropdown Menu */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-divider shadow-card p-2 animate-in fade-in slide-in-from-top-2 z-50">
          <div className="space-y-0.5 max-h-64 overflow-y-auto">
            {LANGUAGES.map((lang) => {
              const isSelected = currentLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-teal-dark text-white font-bold'
                      : 'text-charcoal hover:bg-mint-pale'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <span>{lang.nativeName}</span>
                    {lang.name !== lang.nativeName && (
                      <span className={`text-[11px] ${isSelected ? 'text-mint-light/80' : 'text-charcoal-muted'}`}>
                        ({lang.name})
                      </span>
                    )}
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-accent-green shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

