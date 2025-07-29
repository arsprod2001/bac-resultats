import React from 'react';
import { motion } from 'framer-motion';
//import { getMention } from '@/utils/mentionUtils';


interface Result {
  Decision: string;
  Moy_Bac: string | number;
  Nom_FR: string;
  NOM_AR: string;
  Num_Bac: string | number;
  'Centre Examen  FR': string;
  'Centre Examen  AR': string;
  SERIE: string;
  Wilaya_FR: string;
  Wilaya_AR: string;
  'Date Naiss': string;
  Etablissement_FR: string;
  Etablissement_AR: string;
}

interface ResultCardProps {
  result: Result;
  lang: 'fr' | 'ar';
}

const ResultCard: React.FC<ResultCardProps> = ({ result, lang }) => {
  const isAdmitted = result.Decision === 'Admis Sn';

  const getField = (frField: keyof Result, arField: keyof Result) => {
    return lang === 'fr' ? result[frField] : result[arField];
  };

  const moyenne =
    typeof result.Moy_Bac === 'string'
      ? parseFloat(result.Moy_Bac.replace(',', '.'))
      : result.Moy_Bac;

  //const mention = getMention(moyenne);

  const translations = {
    admitted: { fr: 'Admis au Baccalauréat', ar: 'ناجح في البكالوريا' },
    name: { fr: 'Nom et Prénom', ar: 'الاسم واللقب' },
    candidateNumber: { fr: 'Numéro de Candidat', ar: 'رقم المرشح' },
    examCenter: { fr: "Centre d'Examen", ar: 'مركز الامتحان' },
    average: { fr: 'Moyenne', ar: 'المعدل' },
    mention: { fr: 'Mention', ar: 'الميزة' },
    series: { fr: 'Série', ar: 'الشعبة' },
    wilaya: { fr: 'Wilaya', ar: 'الولاية' },
    birthDate: { fr: 'Date de Naissance', ar: 'تاريخ الميلاد' },
    school: { fr: 'Établissement', ar: 'المؤسسة' },
    decision: { fr: 'Décision', ar: 'القرار' }
  };


  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        boxShadow: "0 10px 50px -10px rgba(99, 102, 241, 0.3)"
      }}
    >
      <div className="p-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-6">
          <div className="text-center mb-6">
            <motion.div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${isAdmitted ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'
                } border ${isAdmitted ? 'border-green-500/30' : 'border-yellow-500/30'}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {isAdmitted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </motion.div>
            <motion.h2
              className="text-2xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isAdmitted ? translations.admitted[lang] : getField('Decision', 'Decision')}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.name[lang]}</p>
                <p className="text-lg font-semibold">{getField('Nom_FR', 'NOM_AR')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.candidateNumber[lang]}</p>
                <p className="text-lg font-mono font-semibold">{result.Num_Bac}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.examCenter[lang]}</p>
                <p className="text-lg font-semibold">{getField('Centre Examen  FR', 'Centre Examen  AR')}</p>
              </motion.div>
            </div>

            <div className="space-y-4">
              {/** 
               * 
               *  <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.mention[lang]}</p>
                <p className="text-lg font-semibold capitalize">{mention}</p>
              </motion.div>
               * 
              */}


              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
              >
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.series[lang]}</p>
                <p className="text-lg font-semibold">{result.SERIE}</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 }}
              >
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.average[lang]}</p>
                <p className="text-4xl font-bold text-white">{moyenne.toFixed(2)}</p>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-8 pt-6 border-t border-indigo-500/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.wilaya[lang]}</p>
                <p className="font-medium">{getField('Wilaya_FR', 'Wilaya_AR')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.birthDate[lang]}</p>
                <p className="font-medium">{result["Date Naiss"]}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-300/80 mb-1">{translations.school[lang]}</p>
                <p className="font-medium">{getField('Etablissement_FR', 'Etablissement_AR')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>


    </motion.div>
  );
};

export default ResultCard;