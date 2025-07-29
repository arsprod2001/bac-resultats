//app/page.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, BarChart2, Search, ChevronRight, Filter, X, User, School, MapPin, Calendar, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import ResultCard from '@/components/ResultCard';
import { fetchResults, searchByCriteria } from '@/data/dataService';
import Logo from "@/components/Logo"
import Link from 'next/link';



type AdvancedCriteria = {
  fullName: string;
  examCenter: string;
  wilaya: string;
  birthYear: string;
  series: string;
  school: string;
};

interface CandidateResult {
  Noreg: string;
  Wilaya_FR: string;
  Wilaya_AR: string;
  "Centre Examen  FR": string;
  "Centre Examen  AR": string;
  Etablissement_FR: string;
  Etablissement_AR: string;
  Num_Bac: string;
  SERIE: string;
  Serie_FR: string;
  Serie_AR: string;
  NNI: string;
  Nom_FR: string;
  NOM_AR: string;
  Lieun_FR: string;
  Lieun_AR: string;
  "Date Naiss": string | number;
  Moy_Bac: number;
  Decision: string;
}

type ResultType = CandidateResult | { multipleResults: CandidateResult[] } | null;


export default function Home() {
  const [candidateNumber, setCandidateNumber] = useState('');
  const [result, setResult] = useState<ResultType>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedCriteria, setAdvancedCriteria] = useState<AdvancedCriteria>({
    fullName: '',
    examCenter: '',
    wilaya: '',
    birthYear: '',
    series: '',
    school: '',
  });
  const [allWilayas, setAllWilayas] = useState<string[]>([]);
  const [allCenters, setAllCenters] = useState<string[]>([]);
  const [allSeries, setAllSeries] = useState<string[]>([]);
  const [allSchools, setAllSchools] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [isClient, setIsClient] = useState(false);



  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const results = await fetchResults();
        setDataLoaded(true);

        const uniqueWilayas = Array.from(new Set(results.map(r => r.Wilaya_FR))).filter(Boolean);
        const uniqueCenters = Array.from(new Set(results.map(r => r["Centre Examen  FR"]))).filter(Boolean);
        const uniqueSeries = Array.from(new Set(results.map(r => r.SERIE))).filter(Boolean);
        const uniqueSchools = Array.from(new Set(results.map(r => r.Etablissement_FR))).filter(Boolean);


        setAllWilayas(uniqueWilayas);
        setAllCenters(uniqueCenters);
        setAllSeries(uniqueSeries);
        setAllSchools(uniqueSchools);

        const savedHistory = localStorage.getItem('searchHistory');
        if (savedHistory) {
          setSearchHistory(JSON.parse(savedHistory));
        }
      } catch {
        setError(lang === 'fr'
          ? 'Erreur lors du chargement des données'
          : 'خطأ في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    if (!dataLoaded) {
      loadData();
    }
  }, [dataLoaded, lang]);

  useEffect(() => {
    if (advancedCriteria.fullName.length > 2) {
      const filteredNames = allSchools.filter(school =>
        school.toLowerCase().includes(advancedCriteria.fullName.toLowerCase())
      ).slice(0, 5);

      setNameSuggestions(filteredNames);
      setShowSuggestions(true);
    } else {
      setNameSuggestions([]);
      setShowSuggestions(false);
    }
  }, [advancedCriteria.fullName, allSchools]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    setShowSuggestions(false);

    const isSimpleSearch = candidateNumber.trim() !== '';
    const isAdvancedSearch = Object.values(advancedCriteria).some(val => val.trim() !== '');

    if (!isSimpleSearch && !isAdvancedSearch) {
      setError(lang === 'fr'
        ? 'Veuillez entrer un critère de recherche'
        : 'يرجى إدخال معيار البحث');

      return;
    }

    try {
      setLoading(true);

      if (!dataLoaded) {
        await fetchResults();
        setDataLoaded(true);
      }

      let foundResults;
      if (isSimpleSearch) {
        foundResults = searchByCriteria({ candidateNumber });

        const newHistory = [candidateNumber, ...searchHistory.filter(n => n !== candidateNumber)].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      } else {
        foundResults = searchByCriteria(advancedCriteria);
      }

      if (foundResults.length > 0) {
        setTimeout(() => {
          if (foundResults.length === 1) {
            setResult(foundResults[0]);
          } else {
            setResult({ multipleResults: foundResults });
          }

        }, 800);
      } else {
        setError(lang === 'fr'
          ? 'Aucun résultat trouvé'
          : 'لم يتم العثور على نتائج');

      }
    } catch {
      setError(lang === 'fr'
        ? 'Erreur lors de la recherche'
        : 'خطأ أثناء البحث');

    } finally {
      setLoading(false);
    }
  };

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const clearAdvancedCriteria = () => {
    setAdvancedCriteria({
      fullName: '',
      examCenter: '',
      wilaya: '',
      birthYear: '',
      series: '',
      school: '',
    });
    setNameSuggestions([]);
    setShowSuggestions(false);
  };

  const handleHistoryClick = (number: string) => {
    setCandidateNumber(number);
    setTimeout(() => {
      const searchButton = document.getElementById('search-button');
      if (searchButton) searchButton.click();
    }, 100);
  };

  const handleSuggestionClick = (name: string) => {
    setAdvancedCriteria({ ...advancedCriteria, fullName: name });
    setNameSuggestions([]);
    setShowSuggestions(false);
  };

  const translations = {
    title: {
      fr: 'Résultats du Bac Mauritanie',
      ar: 'نتائج البكالوريا موريتانيا'
    },

    subtitle: {
      fr: 'Consultez vos résultats du Baccalauréat en ligne',
      ar: 'استعلم عن نتائج البكالوريا عبر الإنترنت'
    },
    inputLabel: {
      fr: 'Numéro de Candidat',
      ar: 'رقم المرشح'
    },
    inputPlaceholder: {
      fr: 'Ex: 35733',
      ar: 'مثال: 35733'
    },
    buttonText: {
      fr: 'Consulter mon résultat',
      ar: 'استعلم عن نتيجتي'
    },
    loadingText: {
      fr: 'Recherche en cours...',
      ar: 'جاري البحث...'
    },
    footerText: {
      fr: '© Ministère de l\'Éducation Nationale - Mauritanie',
      ar: '© وزارة التربية الوطنية - موريتانيا'
    },
    statsText: {
      fr: 'Voir les statistiques complètes',
      ar: 'عرض الإحصائيات الكاملة'
    },
    advancedSearch: {
      fr: 'Recherche Avancée',
      ar: 'بحث متقدم'
    },
    clearFilters: {
      fr: 'Effacer les filtres',
      ar: 'مسح الفلاتر'
    },
    nameFilter: {
      fr: 'Nom complet',
      ar: 'الاسم الكامل'
    },
    centerFilter: {
      fr: 'Centre d\'examen',
      ar: 'مركز الامتحان'
    },
    wilayaFilter: {
      fr: 'Wilaya',
      ar: 'الولاية'
    },
    schoolFilter: {
      fr: 'Établissement',
      ar: 'المؤسسة'
    },
    yearFilter: {
      fr: 'Année de naissance',
      ar: 'سنة الميلاد'
    },
    seriesFilter: {
      fr: 'Série',
      ar: 'الشعبة'
    },
    historyTitle: {
      fr: 'Recherches récentes',
      ar: 'عمليات البحث الأخيرة'
    },
    multipleResults: {
      fr: 'Résultats trouvés',
      ar: 'النتائج التي تم العثور عليها'
    },
    selectCandidate: {
      fr: 'Sélectionnez un candidat',
      ar: 'اختر مرشحًا'
    },
    noSuggestions: {
      fr: 'Aucune suggestion',
      ar: 'لا توجد اقتراحات'
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#24243e] text-white"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Fond animé avec particules */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 30 + 5,
              height: Math.random() * 30 + 5
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>


      <nav className="relative z-10 flex justify-between items-center p-6 sm:p-8">
        <Link href={"/"}>
          <Logo />
        </Link>

        <div className="flex items-center gap-4">




          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 backdrop-blur-sm border border-indigo-600/30 hover:bg-indigo-800/50 transition-all"
          >
            <Globe size={18} />
            <span className="font-medium">{lang === 'fr' ? 'العربية' : 'Français'}</span>
          </motion.button>
        </div>
      </nav>

      <motion.a
        href="/stats"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 backdrop-blur-sm border border-indigo-600/30 hover:bg-indigo-800/50 transition-all"
      >
        <BarChart2 size={18} />
        <span className="font-medium">{translations.statsText[lang]}</span>
      </motion.a>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
              {translations.title[lang]}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
              2024
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {translations.subtitle[lang]}
          </motion.p>
        </div>



        {searchHistory.length > 0 && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-blue-300 mb-2 flex items-center gap-2">
              <Search size={16} />
              {translations.historyTitle[lang]}
            </p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((number, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleHistoryClick(number)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-indigo-800/50 backdrop-blur-sm rounded-lg text-sm border border-indigo-600/30 hover:bg-indigo-700/50 transition-all"
                >
                  {number}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-indigo-500/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{
            boxShadow: "0 10px 50px -10px rgba(99, 102, 241, 0.3)"
          }}
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <motion.label
                htmlFor="candidateNumber"
                className="flex items-center gap-2 text-lg font-medium mb-3 text-cyan-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <User size={18} />
                {translations.inputLabel[lang]}
              </motion.label>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative"
              >
                <input
                  type="text"
                  id="candidateNumber"
                  value={candidateNumber}
                  onChange={(e) => setCandidateNumber(e.target.value)}
                  className="w-full px-5 py-4 text-lg bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-600/50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition placeholder:text-indigo-300/60"
                  placeholder={translations.inputPlaceholder[lang]}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300/60" size={20} />
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={toggleAdvancedSearch}
              className="w-full flex items-center justify-center gap-2 text-indigo-300 hover:text-cyan-300 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <Filter size={16} />
              <span>
                {showAdvancedSearch
                  ? `− ${translations.advancedSearch[lang]}`
                  : `+ ${translations.advancedSearch[lang]}`}
              </span>
            </motion.button>

            <AnimatePresence>
              {showAdvancedSearch && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-indigo-500/20 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nom complet avec autocomplétion */}
                    <div className="relative">
                      <label className="flex items-center gap-2 text-sm font-medium mb-2 text-cyan-200">
                        <User size={14} />
                        {translations.nameFilter[lang]}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={advancedCriteria.fullName}
                          onChange={(e) => setAdvancedCriteria({ ...advancedCriteria, fullName: e.target.value })}
                          className="w-full px-4 py-3 bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-600/50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition placeholder:text-indigo-300/60"
                          placeholder={lang === 'fr' ? "Nom et prénom" : "الاسم واللقب"}
                          ref={nameInputRef}
                        />

                        <AnimatePresence>
                          {showSuggestions && nameSuggestions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="absolute z-10 w-full mt-1 bg-indigo-900 backdrop-blur-lg rounded-xl shadow-lg border border-indigo-600/50 overflow-hidden"
                            >
                              {nameSuggestions.map((suggestion, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="px-4 py-2 hover:bg-indigo-800/50 cursor-pointer transition-colors"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Centre d'examen */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2 text-cyan-200">
                        <School size={14} />
                        {translations.centerFilter[lang]}
                      </label>
                      <select
                        value={advancedCriteria.examCenter}
                        onChange={(e) => setAdvancedCriteria({ ...advancedCriteria, examCenter: e.target.value })}
                        className="w-full px-4 py-3 bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-600/50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                      >
                        <option value="">{lang === 'fr' ? "Tous les centres" : "جميع المراكز"}</option>
                        {allCenters.map(center => (
                          <option key={center} value={center}>{center}</option>
                        ))}
                      </select>
                    </div>

                    {/* Wilaya */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2 text-cyan-200">
                        <MapPin size={14} />
                        {translations.wilayaFilter[lang]}
                      </label>
                      <select
                        value={advancedCriteria.wilaya}
                        onChange={(e) => setAdvancedCriteria({ ...advancedCriteria, wilaya: e.target.value })}
                        className="w-full px-4 py-3 bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-600/50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                      >
                        <option value="">{lang === 'fr' ? "Toutes les wilayas" : "جميع الولايات"}</option>
                        {allWilayas.map(wilaya => (
                          <option key={wilaya} value={wilaya}>{wilaya}</option>
                        ))}
                      </select>
                    </div>

                    {/* Établissement */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2 text-cyan-200">
                        <Building size={14} />
                        {translations.schoolFilter[lang]}
                      </label>
                      <select
                        value={advancedCriteria.school}
                        onChange={(e) => setAdvancedCriteria({ ...advancedCriteria, school: e.target.value })}
                        className="w-full px-4 py-3 bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-600/50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                      >
                        <option value="">{lang === 'fr' ? "Tous les établissements" : "جميع المؤسسات"}</option>
                        {allSchools.map(school => (
                          <option key={school} value={school}>{school}</option>
                        ))}
                      </select>
                    </div>

                    {/* Année de naissance */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-2 text-cyan-200">
                        <Calendar size={14} />
                        {translations.yearFilter[lang]}
                      </label>
                      <input
                        type="number"
                        value={advancedCriteria.birthYear}
                        onChange={(e) => setAdvancedCriteria({ ...advancedCriteria, birthYear: e.target.value })}
                        className="w-full px-4 py-3 bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-600/50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition placeholder:text-indigo-300/60"
                        placeholder={lang === 'fr' ? "Ex: 2005" : "مثال: 2005"}
                        min="1950"
                        max="2010"
                      />
                    </div>

                    {/* Série */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 text-cyan-200">
                        {translations.seriesFilter[lang]}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {allSeries.map(serie => (
                          <button
                            key={serie}
                            type="button"
                            onClick={() => setAdvancedCriteria({
                              ...advancedCriteria,
                              series: advancedCriteria.series === serie ? '' : serie
                            })}
                            className={cn(
                              "py-2 px-3 rounded-lg border transition-all",
                              advancedCriteria.series === serie
                                ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                                : "bg-indigo-900/30 border-indigo-600/50 hover:bg-indigo-800/30"
                            )}
                          >
                            {serie}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bouton réinitialiser */}
                    <div className="md:col-span-2 flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={clearAdvancedCriteria}
                        className="flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        <X size={14} />
                        {translations.clearFilters[lang]}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              id="search-button"
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2",
                "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700",
                "shadow-lg hover:shadow-xl hover:shadow-cyan-500/20",
                "disabled:opacity-70 disabled:cursor-not-allowed"
              )}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {translations.loadingText[lang]}
                </>
              ) : (
                <>
                  <span>{translations.buttonText[lang]}</span>
                  <ChevronRight className={lang === 'ar' ? 'rotate-180' : ''} />
                </>
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                className="mt-6 p-4 bg-red-900/30 rounded-xl border border-red-500/30 backdrop-blur-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="text-red-200 text-center font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              {/* Affichage des résultats multiples */}
              {'multipleResults' in result ? (
                <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-indigo-500/20">
                  <h3 className="text-xl font-bold mb-4 text-cyan-300 flex items-center gap-2">
                    <Search size={20} />
                    {translations.multipleResults[lang]} ({result.multipleResults.length})
                  </h3>

                  <p className="text-blue-200 mb-4">
                    {translations.selectCandidate[lang]}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                    {result.multipleResults.map((res, index) => (

                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-indigo-900/30 rounded-xl p-4 border border-indigo-600/50 hover:border-cyan-500/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setResult(res);
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg">{res.Nom_FR}</h4>
                            <p className="text-sm text-blue-200">#{res.Num_Bac}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-cyan-300">{res.Moy_Bac}</p>
                            <p className="text-xs text-blue-200">{res.Wilaya_FR}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <span className="px-2 py-1 bg-indigo-800/50 text-xs rounded">
                            {res.SERIE}
                          </span>
                          <span className="px-2 py-1 bg-indigo-800/50 text-xs rounded">
                            {res["Centre Examen  FR"]}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                // Affichage d'un résultat unique
                <ResultCard result={{ ...result, 'Date Naiss': String(result['Date Naiss']) }} lang={lang} />

              )}


            </motion.div>
          )}
        </AnimatePresence>

        {/* Pied de page */}
        <motion.footer
          className="mt-16 text-center text-indigo-300/70 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p>{translations.footerText[lang]}</p>
        </motion.footer>
      </div>
    </div >
  );
}
