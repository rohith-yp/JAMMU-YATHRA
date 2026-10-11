import React from 'react';
import Link from 'next/link';
import { Compass, Waves, Landmark, ArrowRight, Clock, MapPin } from 'lucide-react';

export default function ExperienceModules() {
  const modules = [
    {
      title: 'Beyond Yatra',
      subtitle: 'Enrich Your Pilgrimage Journey',
      description: 'Discover attractions beyond your main pilgrimage destination, tailored specifically to your available time and personal interests.',
      icon: Compass,
      linkText: 'Plan Beyond Yatra',
      href: '/plan',
      badge: 'Interactive Planner',
      badgeColor: 'bg-teal-dark/10 text-teal-dark border-teal-dark/20',
      bgGradient: 'from-white to-mint-pale/30',
      borderColor: 'hover:border-teal-accent'
    },
    {
      title: 'Tawi Experience',
      subtitle: 'The Sacred Riverfront',
      description: 'Explore Tawi riverfront locations, promenade walks, ancient cave shrines, and scenic viewpoints along the Surya Putri river.',
      icon: Waves,
      linkText: 'Explore Tawi Circuit',
      href: '/tawi-experience',
      badge: 'Riverfront Corridor',
      badgeColor: 'bg-blue-900/10 text-blue-900 border-blue-900/20',
      bgGradient: 'from-white to-blue-50/40',
      borderColor: 'hover:border-blue-700'
    },
    {
      title: 'Hidden Jammu',
      subtitle: 'Lesser-Known Heritage & Culture',
      description: 'Find historic fortresses, traditional Dogra culinary markets, artisan stepwells, and authentic local community hubs.',
      icon: Landmark,
      linkText: 'Discover Hidden Gems',
      href: '/hidden-jammu',
      badge: 'Cultural Discovery',
      badgeColor: 'bg-amber-900/10 text-amber-900 border-amber-900/20',
      bgGradient: 'from-white to-amber-50/40',
      borderColor: 'hover:border-amber-700'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-dark tracking-tight">
            Three Distinct Ways to Discover Jammu
          </h2>
          <p className="text-base text-charcoal-muted leading-relaxed">
            Choose your preferred path to explore Jammu's rich heritage, riverfront ecosystem, and hidden local cultural treasures.
          </p>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((mod) => {
            const IconComponent = mod.icon;
            return (
              <div
                key={mod.title}
                className={`relative rounded-2xl p-8 bg-gradient-to-b ${mod.bgGradient} border border-divider ${mod.borderColor} shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-teal-dark text-white flex items-center justify-center group-hover:bg-teal-accent transition-colors">
                      <IconComponent className="w-6 h-6 text-accent-green" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-teal-dark group-hover:text-teal-accent transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs font-semibold text-charcoal-muted mt-1">
                      {mod.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-charcoal/80 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-divider/60">
                  <Link
                    href={mod.href}
                    className="inline-flex items-center space-x-2 text-sm font-bold text-teal-dark hover:text-teal-accent transition-colors group-hover:translate-x-1 transition-transform"
                  >
                    <span>{mod.linkText}</span>
                    <ArrowRight className="w-4 h-4 text-accent-terracotta" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
