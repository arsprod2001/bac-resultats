import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface WilayaData {
  name: string;
  taux: number;
}

interface WilayaNames {
  fr: string;
  ar: string;
}

interface ResultItem {
  Wilaya_FR: string;
  Wilaya_AR: string;
  // ajoute d'autres champs si besoin
}

// Couleurs accessibles pour daltoniens, tableau de tuples [string, string]
const ACCESSIBLE_COLORS: Array<[string, string]> = [
  ['#4C72B0', '#2E59A2'], // Bleu
  ['#55A868', '#338043'], // Vert
  ['#C44E52', '#A23540'], // Rouge
  ['#8172B2', '#645497'], // Violet
  ['#CCB974', '#B09D46'], // Or
  ['#64B5CD', '#4298B4'], // Cyan
];

const WilayaMap: React.FC<{ data: WilayaData[]; lang: 'fr' | 'ar' }> = ({ data, lang }) => {
  const [selectedWilaya, setSelectedWilaya] = useState<string | null>(null);
  const [wilayaNames, setWilayaNames] = useState<Record<string, WilayaNames>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement des noms des wilayas depuis results.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/results.json');
        if (!res.ok) throw new Error('Failed to load data');
        
        const results: ResultItem[] = await res.json();
        const names: Record<string, WilayaNames> = {};
        
        results.forEach((item: ResultItem) => {
          names[item.Wilaya_FR] = {
            fr: item.Wilaya_FR,
            ar: item.Wilaya_AR
          };
        });
        
        setWilayaNames(names);
      } catch (err) {
        setError('Erreur de chargement des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mémoisation des calculs : min, max taux et mapping couleurs
  const { minTaux, maxTaux, colorMap } = useMemo(() => {
    const tauxValues = data.map(d => d.taux);
    const min = Math.min(...tauxValues);
    const max = Math.max(...tauxValues);
    
    const colorMapping: Record<string, [string, string]> = {};
    data.forEach((item, index) => {
      colorMapping[item.name] = ACCESSIBLE_COLORS[index % ACCESSIBLE_COLORS.length];
    });

    return { minTaux: min, maxTaux: max, colorMap: colorMapping };
  }, [data]);

  // Obtenir le nom localisé de la wilaya
  const getWilayaName = (id: string): string => {
    return wilayaNames[id] 
      ? (lang === 'fr' ? wilayaNames[id].fr : wilayaNames[id].ar)
      : id;
  };

  // Calcul taille des bulles entre minSize et maxSize
  const calculateSize = (taux: number): number => {
    const minSize = 40; // px
    const maxSize = 120; // px
    if (maxTaux === minTaux) return (minSize + maxSize) / 2; // éviter division par 0
    return minSize + ((taux - minTaux) / (maxTaux - minTaux)) * (maxSize - minSize);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Conteneur responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {data.map((wilaya) => {
          const size = calculateSize(wilaya.taux);
          const [colorStart, colorEnd] = colorMap[wilaya.name] || ACCESSIBLE_COLORS[0];
          const isSelected = selectedWilaya === wilaya.name;
          const name = getWilayaName(wilaya.name);

          return (
            <motion.div
              key={wilaya.name}
              layout
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setSelectedWilaya(isSelected ? null : wilaya.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={isSelected}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedWilaya(isSelected ? null : wilaya.name);
                }
              }}
            >
              <motion.div
                className="rounded-full border-2 border-white shadow-lg flex items-center justify-center relative"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `linear-gradient(135deg, ${colorStart}, ${colorEnd})`,
                }}
                animate={{
                  scale: isSelected ? 1.2 : 1,
                  zIndex: isSelected ? 20 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-white font-bold text-xs md:text-sm select-none">
                  {Math.round(wilaya.taux)}%
                </span>
                
                {isSelected && (
                  <motion.div
                    className="absolute -bottom-8 bg-slate-800 text-white px-3 py-2 rounded-lg shadow-xl min-w-[160px] text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="font-bold text-cyan-300">{name}</h3>
                    <div className="mt-1 w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${wilaya.taux}%`,
                          background: `linear-gradient(90deg, ${colorStart}, ${colorEnd})`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1">
                      {lang === 'fr' ? 'Taux: ' : 'النسبة: '}
                      <span className="font-bold">{wilaya.taux.toFixed(1)}%</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>
              
              <p className="mt-2 text-xs text-center text-gray-700 dark:text-gray-300 font-medium select-none">
                {/* Affiche les premières 3 lettres de chaque mot, séparées par points */}
                {name.split(' ').map(word => word.slice(0, 3)).join('.')}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Légende responsive */}
      <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-cyan-600 dark:text-cyan-400">
              {lang === 'fr' ? 'Légende' : 'مفتاح الخريطة'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lang === 'fr' 
                ? 'Taille des bulles proportionnelle au taux' 
                : 'حجم الدوائر يتناسب مع النسبة'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm select-none">
                {minTaux.toFixed(1)}% ({lang === 'fr' ? 'Min' : 'الأدنى'})
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-500"></div>
              <span className="text-sm select-none">
                {((minTaux + maxTaux) / 2).toFixed(1)}%
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500"></div>
              <span className="text-sm select-none">
                {maxTaux.toFixed(1)}% ({lang === 'fr' ? 'Max' : 'الأعلى'})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WilayaMap;
