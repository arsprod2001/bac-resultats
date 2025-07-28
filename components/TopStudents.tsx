import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Student {
    Num_Bac: string;
    Nom_FR: string;
    NOM_AR: string;
    Wilaya_FR: string;
    Wilaya_AR: string;
    SERIE: string;
    Serie_FR: string;
    Serie_AR: string;
    Etablissement_FR: string;
    Etablissement_AR: string;
    Moy_Bac: number;
}

interface TopStudentsProps {
    globalTop: Student[];
    wilayaTop: { [key: string]: Student[] };
    series: string[];
    lang: 'fr' | 'ar';
}

const TopStudents: React.FC<TopStudentsProps> = ({
    globalTop,
    wilayaTop,
    series,
    lang
}) => {
    const [activeTab, setActiveTab] = useState('global');
    const [selectedWilaya, setSelectedWilaya] = useState(Object.keys(wilayaTop)[0]);
    const [selectedSerie, setSelectedSerie] = useState(series[0]);

    const currentData = activeTab === 'global'
        ? globalTop
        : activeTab === 'wilaya'
            ? wilayaTop[selectedWilaya] || []
            : globalTop.filter(student => student.SERIE === selectedSerie).slice(0, 10);

    const podium = currentData.slice(0, 3);
    const otherStudents = currentData.slice(3);

    const translations = {
        fr: {
            global: 'Top 10 Global',
            wilayaTitle: 'Top 10 par Wilaya',
            serieTitle: 'Top 10 par Série',
            selectWilaya: 'Sélectionnez une wilaya:',
            selectSerie: 'Sélectionnez une série:',
            rank: '#',
            name: 'Nom',
            wilaya: 'Wilaya',
            serie: 'Série',
            school: 'Établissement',
            average: 'Moyenne',
            wilayaLabel: 'Wilaya:',
            serieLabel: 'Série:',
            schoolLabel: 'Établissement:',
            averageLabel: 'Moyenne:'
        },
        ar: {
            global: 'أفضل 10 على المستوى الوطني',
            wilayaTitle: 'أفضل 10 حسب الولاية',
            serieTitle: 'أفضل 10 حسب الشعبة',
            selectWilaya: 'اختر ولاية:',
            selectSerie: 'اختر شعبة:',
            rank: 'المركز',
            name: 'الاسم',
            wilaya: 'الولاية',
            serie: 'الشعبة',
            school: 'المؤسسة',
            average: 'المعدل',
            wilayaLabel: 'الولاية:',
            serieLabel: 'الشعبة:',
            schoolLabel: 'المؤسسة:',
            averageLabel: 'المعدل:'
        }
    };

    const getName = (student: Student) => lang === 'fr' ? student.Nom_FR : student.NOM_AR;
    const getWilaya = (student: Student) => lang === 'fr' ? student.Wilaya_FR : student.Wilaya_AR;
    const getSerie = (student: Student) => lang === 'fr' ? student.Serie_FR : student.Serie_AR;
    const getSchool = (student: Student) => lang === 'fr' ? student.Etablissement_FR : student.Etablissement_AR;

    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-slate-700">
            <div className="flex flex-wrap gap-2 mb-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm md:text-base ${activeTab === 'global'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    onClick={() => setActiveTab('global')}
                >
                    {translations[lang].global}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm md:text-base ${activeTab === 'wilaya'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    onClick={() => setActiveTab('wilaya')}
                >
                    {translations[lang].wilayaTitle}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm md:text-base ${activeTab === 'serie'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                    onClick={() => setActiveTab('serie')}
                >
                    {translations[lang].serieTitle}
                </motion.button>
            </div>

            {activeTab === 'wilaya' && (
                <div className="mb-6">
                    <label className="block mb-2 font-medium text-cyan-300">
                        {translations[lang].selectWilaya}
                    </label>
                    <select
                        value={selectedWilaya}
                        onChange={(e) => setSelectedWilaya(e.target.value)}
                        className="w-full p-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                        {Object.entries(wilayaTop).map(([wilayaFR, students]) => {
                            const wilayaLabel = lang === 'fr' ? wilayaFR : students[0]?.Wilaya_AR || wilayaFR;
                            return (
                                <option key={wilayaFR} value={wilayaFR}>{wilayaLabel}</option>
                            );
                        })}
                    </select>
                </div>
            )}

            {activeTab === 'serie' && (
                <div className="mb-6">
                    <label className="block mb-2 font-medium text-cyan-300">
                        {translations[lang].selectSerie}
                    </label>
                    <select
                        value={selectedSerie}
                        onChange={(e) => setSelectedSerie(e.target.value)}
                        className="w-full p-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                        {series.map(serie => (
                            <option key={serie} value={serie}>{serie}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {podium.map((student, index) => (
                    <motion.div
                        key={student.Num_Bac}
                        className={`p-4 rounded-xl border-2 ${index === 0
                            ? 'bg-gradient-to-br from-amber-900/30 to-amber-800/20 border-amber-500 shadow-lg shadow-amber-500/20'
                            : index === 1
                                ? 'bg-gradient-to-br from-slate-700/30 to-slate-800/20 border-slate-500 shadow-lg shadow-slate-500/20'
                                : 'bg-gradient-to-br from-amber-800/30 to-amber-900/20 border-amber-700 shadow-lg shadow-amber-700/20'
                            }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                                : index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-600'
                                    : 'bg-gradient-to-br from-amber-500 to-amber-700'
                                }`}>
                                <span className="font-bold text-white">{index + 1}</span>
                            </div>
                            <span className="text-xl font-bold text-white">{student.Moy_Bac.toFixed(2)}</span>
                        </div>
                        <h3 className="font-bold text-white truncate">{getName(student)}</h3>
                        <p className="text-sm text-slate-300 truncate">{getWilaya(student)}</p>
                        <p className="text-sm text-slate-300">{getSerie(student)}</p>
                    </motion.div>
                ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-700">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                {translations[lang].rank}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                {translations[lang].name}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                {translations[lang].wilaya}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                {translations[lang].serie}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                {translations[lang].school}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                                {translations[lang].average}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {currentData.map((student, index) => (
                            <motion.tr
                                key={student.Num_Bac}
                                className={index < 3 ? "bg-gradient-to-r from-amber-900/10 to-amber-900/5" : "hover:bg-slate-700/50"}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                            >
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">
                                    <div className={`w-6 h-6 flex items-center justify-center rounded-full ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                                        : index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-600'
                                            : index === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-700'
                                                : 'bg-slate-600'
                                        }`}>
                                        {index + 1}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-white">
                                    {getName(student)}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-300">
                                    {getWilaya(student)}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-300">
                                    {getSerie(student)}
                                </td>
                                <td className="px-4 py-3 text-sm text-slate-300">
                                    {getSchool(student)}
                                </td>
                                <td className="px-4 py-3 text-sm font-bold text-cyan-400">
                                    {student.Moy_Bac.toFixed(2)}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden space-y-4">
                {otherStudents.map((student, index) => (
                    <motion.div
                        key={student.Num_Bac}
                        className="bg-slate-700/50 rounded-xl p-4 border border-slate-600"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index + 3) * 0.05 }}
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center mb-2">
                                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-600 mr-2">
                                        <span className="text-xs font-bold">{index + 4}</span>
                                    </div>
                                    <h3 className="font-bold text-white">{getName(student)}</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-slate-400">{translations[lang].wilayaLabel} </span>
                                        <span className="text-slate-300">{getWilaya(student)}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400">{translations[lang].serieLabel} </span>
                                        <span className="text-slate-300">{getSerie(student)}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-slate-400">{translations[lang].schoolLabel} </span>
                                        <span className="text-slate-300">{getSchool(student)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl font-bold text-cyan-400">
                                {student.Moy_Bac.toFixed(2)}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TopStudents;
