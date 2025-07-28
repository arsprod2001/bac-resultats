// data/dataService.ts

export interface ResultItem {
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

let resultsData: ResultItem[] = [];

/**
 * Convertit une date en objet Date valide, même si elle est en format Excel (ex: 38198)
 */
function parseDateNaiss(dateValue: string | number | undefined): Date | null {
  if (!dateValue) return null;

  if (typeof dateValue === 'number') {
    const excelEpoch = new Date(1899, 11, 30);
    return new Date(excelEpoch.getTime() + dateValue * 86400000);
  }

  const parsed = Date.parse(dateValue.toString());
  if (!isNaN(parsed)) return new Date(parsed);

  return null;
}

/**
 * Charge les résultats depuis le fichier JSON (si ce n’est pas déjà fait)
 */
export const fetchResults = async (): Promise<ResultItem[]> => {
  if (resultsData.length > 0) return resultsData;

  try {
    const response = await fetch('/results.json');
    if (!response.ok) throw new Error('Erreur de chargement des données');

    resultsData = await response.json();

    // Trier les résultats par ordre alphabétique du nom
    resultsData.sort((a, b) => a.Nom_FR.localeCompare(b.Nom_FR));

    return resultsData;
  } catch (error) {
    console.error('❌ Erreur de chargement des résultats:', error);
    throw error;
  }
};

/**
 * Recherche un candidat par numéro de bac
 */
export const searchByCandidateNumber = (candidateNumber: string): ResultItem | null => {
  return resultsData.find(item => item.Num_Bac === candidateNumber) || null;
};

/**
 * Recherche avancée par critères multiples
 */
export const searchByCriteria = (criteria: {
  candidateNumber?: string;
  fullName?: string;
  examCenter?: string;
  wilaya?: string;
  birthYear?: string;
  school?: string;
  series?: string;
}): ResultItem[] => {
  return resultsData.filter(result => {
    if (criteria.candidateNumber && result.Num_Bac !== criteria.candidateNumber) {
      return false;
    }

    if (criteria.fullName && !result.Nom_FR?.toLowerCase().includes(criteria.fullName.toLowerCase())) {
      return false;
    }

    if (criteria.examCenter && result["Centre Examen  FR"] !== criteria.examCenter) {
      return false;
    }

    if (criteria.wilaya && result.Wilaya_FR !== criteria.wilaya) {
      return false;
    }

    if (criteria.school && result.Etablissement_FR !== criteria.school) {
      return false;
    }

    if (criteria.birthYear) {
      const birthDate = parseDateNaiss(result["Date Naiss"]);
      const birthYear = birthDate ? birthDate.getFullYear().toString() : '';
      if (birthYear !== criteria.birthYear) {
        return false;
      }
    }

    if (criteria.series && result.SERIE !== criteria.series) {
      return false;
    }

    return true;
  });
};
