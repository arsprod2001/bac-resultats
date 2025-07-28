//stats/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import WilayaMap from '@/components/WilayaMap';
import TopStudents from '@/components/TopStudents';
import Link from 'next/link';
import { ArrowLeftIcon, Globe } from 'lucide-react';
import Logo from '@/components/Logo';

interface Student {
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

interface WilayaStat {
    taux: number;
    moyenne: number;
    moyennes: number[];
}

interface SerieStat {
    taux: number;
    admis: number;
}

interface StatsData {
    global: {
        total: number;
        tauxReussite: number;
        admis: number;
        ajournes: number;
        sessionnaires: number;
    };
    moyennes: {
        generale: number;
        ecartType: number;
    };
    parWilaya: Record<string, WilayaStat>;
    parSerie: Record<string, SerieStat>;
    top10: Student[];
    top10Wilaya: Record<string, Student[]>;
}

// Traductions
const translations = {
    fr: {
        back: "Retour à l'accueil",
        title: "Statistiques du Baccalauréat Mauritanien",
        totalCandidates: "Total Candidats",
        successRate: "Taux de Réussite",
        average: "Moyenne Générale",
        standardDeviation: "Écart-type",
        distribution: "Distribution des Moyennes",
        wilayaPerformance: "Performance par Wilaya",
        seriePerformance: "Performance par Série",
        topResults: "Meilleurs Résultats",
        admitted: "Admis",
        postponed: "Ajournés",
        sessionRetake: "Sessionnaires",
        successRatePercentage: "Taux de réussite (%)",
        numberOfAdmitted: "Nombre d'admis",
        studentCount: "Nombre d'élèves",
        loading: "Chargement des statistiques...",
        error: "Erreur de chargement",
        retry: "Réessayer",
        decisions: "Décisions",
    },
    ar: {
        back: "العودة إلى الصفحة الرئيسية",
        title: "إحصائيات البكالوريا الموريتانية",
        totalCandidates: "إجمالي المترشحين",
        successRate: "معدل النجاح",
        average: "المعدل العام",
        standardDeviation: "الانحراف المعياري",
        distribution: "توزيع المعدلات",
        wilayaPerformance: "الأداء حسب الولاية",
        seriePerformance: "الأداء حسب الشعبة",
        topResults: "أفضل النتائج",
        admitted: "ناجحون",
        postponed: "راسبون",
        sessionRetake: "ملحقون",
        successRatePercentage: "معدل النجاح (%)",
        numberOfAdmitted: "عدد الناجحين",
        studentCount: "عدد التلاميذ",
        loading: "جاري تحميل الإحصائيات...",
        error: "خطأ في التحميل",
        retry: "إعادة المحاولة",
        decisions: "القرارات",
    }
};

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f97316', '#ef4444'];

export default function StatsPage() {
    const [lang, setLang] = useState<'fr' | 'ar'>('fr');
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedLang = localStorage.getItem('lang');
        if (savedLang === 'fr' || savedLang === 'ar') {
            setLang(savedLang);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }, [lang]);

    const toggleLang = () => {
        setLang(prev => prev === 'fr' ? 'ar' : 'fr');
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const response = await fetch('/stats.json');
                if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
                const data: StatsData = await response.json();
                setStats(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <LoadingScreen lang={lang} />;
    if (error || !stats) return <ErrorScreen error={error} lang={lang} />;

    const wilayaData = Object.keys(stats.parWilaya).map(wilaya => ({
        name: wilaya,
        taux: stats.parWilaya[wilaya].taux,
        moyenne: stats.parWilaya[wilaya].moyenne
    }));

    const serieData = Object.keys(stats.parSerie).map(serie => ({
        name: serie,
        taux: stats.parSerie[serie].taux,
        admis: stats.parSerie[serie].admis
    }));

    const decisionsData = [
        { name: translations[lang].admitted, value: stats.global.admis },
        { name: translations[lang].postponed, value: stats.global.ajournes },
        { name: translations[lang].sessionRetake, value: stats.global.sessionnaires }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#24243e] text-white">

            <nav className="relative z-10 flex justify-between items-center p-6 sm:p-8">
                <Link href="/">
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

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        {translations[lang].back}
                    </Link>
                </div>

                <PageTitle lang={lang} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard title={translations[lang].totalCandidates} value={stats.global.total.toLocaleString()} icon={<UserIcon />} color="blue" lang={lang} />
                    <StatCard title={translations[lang].successRate} value={`${stats.global.tauxReussite.toFixed(2)}%`} icon={<ChartIcon />} color="green" lang={lang} />
                    <StatCard title={translations[lang].average} value={stats.moyennes.generale.toFixed(2)} icon={<StarIcon />} color="purple" lang={lang} />
                    <StatCard title={translations[lang].standardDeviation} value={stats.moyennes.ecartType.toFixed(2)} icon={<ScaleIcon />} color="amber" lang={lang} />
                </div>

                <Section title={translations[lang].distribution} lang={lang}>
                    <GlassCard>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={generateHistogramData(stats)}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4f46e5" strokeOpacity={0.2} />
                                <XAxis dataKey="range" stroke="#c7d2fe" />
                                <YAxis stroke="#c7d2fe" />
                                <Tooltip content={<CustomTooltip lang={lang} />} />
                                <Legend />
                                <Bar dataKey="count" name={translations[lang].studentCount} fill="#8884d8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </GlassCard>
                </Section>

                <Section title={translations[lang].wilayaPerformance} lang={lang}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <GlassCard>
                            <WilayaMap data={wilayaData} lang={lang} />
                        </GlassCard>
                        <GlassCard>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={[...wilayaData].sort((a, b) => b.taux - a.taux).slice(0, 10)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4f46e5" strokeOpacity={0.2} />
                                    <XAxis dataKey="name" stroke="#c7d2fe" />
                                    <YAxis stroke="#c7d2fe" />
                                    <Tooltip content={<CustomTooltip lang={lang} />} />
                                    <Legend />
                                    <Bar dataKey="taux" name={translations[lang].successRatePercentage} fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </GlassCard>
                    </div>
                </Section>

                <Section title={translations[lang].seriePerformance} lang={lang}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <GlassCard>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={serieData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4f46e5" strokeOpacity={0.2} />
                                    <XAxis dataKey="name" stroke="#c7d2fe" />
                                    <YAxis stroke="#c7d2fe" />
                                    <Tooltip content={<CustomTooltip lang={lang} />} />
                                    <Legend />
                                    <Bar dataKey="taux" name={translations[lang].successRatePercentage} fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="admis" name={translations[lang].numberOfAdmitted} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </GlassCard>
                        <GlassCard>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={decisionsData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={150}
                                        innerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        nameKey="name"
                                    >
                                        {decisionsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.name} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip lang={lang} />} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </GlassCard>
                    </div>
                </Section>

                <Section title={translations[lang].topResults} lang={lang}>
                    <TopStudents
                        globalTop={stats.top10}
                        wilayaTop={stats.top10Wilaya}
                        series={Object.keys(stats.parSerie)}
                        lang={lang}
                    />
                </Section>
            </div>
        </div>
    );
}

// Composants utilitaires
interface LoadingScreenProps {
    lang: 'fr' | 'ar';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ lang }) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#24243e]">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto animate-spin mb-4" />
            <p className="text-indigo-200">{translations[lang].loading}</p>
        </div>
    </div>
);

interface ErrorScreenProps {
    error: string | null;
    lang: 'fr' | 'ar';
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, lang }) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#24243e]">
        <div className="bg-red-900/30 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30 max-w-md text-center">
            <h2 className="text-xl font-bold text-red-300 mb-4">{translations[lang].error}</h2>
            <p className="text-red-200">{error || translations[lang].error}</p>
            <button
                className="mt-4 px-4 py-2 bg-red-700/50 hover:bg-red-700/70 rounded-lg transition-colors"
                onClick={() => window.location.reload()}
            >
                {translations[lang].retry}
            </button>
        </div>
    </div>
);

interface PageTitleProps {
    lang: 'fr' | 'ar';
}

const PageTitle: React.FC<PageTitleProps> = ({ lang }) => (
    <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-12 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
            {translations[lang].title}
        </span>
    </motion.h1>
);

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: 'blue' | 'green' | 'purple' | 'amber';
    lang: 'fr' | 'ar';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {

    const colorClasses = {
        blue: 'from-blue-900/30 to-blue-700/30 border-blue-500/20 text-blue-200',
        green: 'from-green-900/30 to-green-700/30 border-green-500/20 text-green-200',
        purple: 'from-purple-900/30 to-purple-700/30 border-purple-500/20 text-purple-200',
        amber: 'from-amber-900/30 to-amber-700/30 border-amber-500/20 text-amber-200'
    };

    const bgClass = {
        blue: 'bg-blue-500/20',
        green: 'bg-green-500/20',
        purple: 'bg-purple-500/20',
        amber: 'bg-amber-500/20'
    }[color];

    return (
        <motion.div
            className={`bg-gradient-to-br backdrop-blur-lg rounded-2xl shadow-2xl p-6 border ${colorClasses[color]}`}
            whileHover={{ boxShadow: "0 10px 50px -10px rgba(99, 102, 241, 0.3)", y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium mb-2">{title}</h3>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${bgClass}`}>{icon}</div>
            </div>
        </motion.div>
    );
};

interface SectionProps {
    title: string;
    children: React.ReactNode;
    lang: 'fr' | 'ar';
}

const Section: React.FC<SectionProps> = ({ title, children, lang }) => {
    const textDirection = lang === 'ar' ? 'text-right' : 'text-left';

    return (
        <motion.div
            className={`mb-12 ${textDirection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-cyan-300 border-l-4 border-cyan-500 pl-3 py-1">
                {title}
            </h2>
            {children}
        </motion.div>
    );
};

interface GlassCardProps {
    children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ children }) => (
    <div className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-indigo-500/20">
        {children}
    </div>
);

interface TooltipItem {
    dataKey: string;
    name: string;
    value: number;
    color: string;
    payload?: unknown;
}


interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipItem[];
    label?: string;
    lang: 'fr' | 'ar';
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, lang }) => {
    if (!active || !payload || !payload.length) return null;

    const keyTranslations: Record<string, string> = {
        'count': translations[lang].studentCount,
        'taux': translations[lang].successRatePercentage,
        'admis': translations[lang].numberOfAdmitted,
        'value': translations[lang].studentCount
    };

    return (
        <div className="bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-indigo-500/30">
            <p className="font-bold">{label}</p>
            {payload.map((entry, index) => (
                <p key={index} style={{ color: entry.color }}>
                    {keyTranslations[entry.dataKey] || entry.name}: <strong>{entry.value}</strong>
                </p>
            ))}
        </div>
    );
};

function generateHistogramData(stats: StatsData) {
    const ranges = [
        { range: '0-5', min: 0, max: 5 },
        { range: '5-8', min: 5, max: 8 },
        { range: '8-10', min: 8, max: 10 },
        { range: '10-12', min: 10, max: 12 },
        { range: '12-14', min: 12, max: 14 },
        { range: '14-16', min: 14, max: 16 },
        { range: '16-18', min: 16, max: 18 },
        { range: '18-20', min: 18, max: 20 },
    ];

    return ranges.map(range => {
        const count = Object.values(stats.parWilaya).reduce((total, wilaya) => {
            return total + wilaya.moyennes.filter(m => m >= range.min && m < range.max).length;
        }, 0);
        return { ...range, count };
    });
}

// Icônes
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const ChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
);