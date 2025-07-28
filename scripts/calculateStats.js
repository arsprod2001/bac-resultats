const fs = require('fs');
const path = require('path');
const results = require('../public/results.json');

const statsFile = path.join(__dirname, '../public/stats.json');

// ✅ Fonction pour convertir Moy_Bac en float, peu importe le type
function toFloat(val) {
  return typeof val === 'string' ? parseFloat(val.replace(',', '.')) : val;
}

function calculateStats() {
  // Initialiser les structures de données
  const stats = {
    global: {
      total: results.length,
      admis: 0,
      ajournes: 0,
      sessionnaires: 0,
      tauxReussite: 0,
    },
    parSerie: {},
    parWilaya: {},
    parEtablissement: {},
    parCentre: {},
    moyennes: {
      generale: 0,
      admis: 0,
      ecartType: 0,
    },
    top10: [],
    top10Wilaya: {},
  };

  let totalMoyenne = 0;
  let totalMoyenneAdmis = 0;
  const moyennes = [];

  results.forEach(result => {
    const moyenne = toFloat(result.Moy_Bac);
    totalMoyenne += moyenne;
    moyennes.push(moyenne);

    if (result.Decision === 'Admis Sn') {
      stats.global.admis++;
      totalMoyenneAdmis += moyenne;
    } else if (result.Decision === 'Ajourné Sn') {
      stats.global.ajournes++;
    } else if (result.Decision === 'Sessionnaire') {
      stats.global.sessionnaires++;
    }

    // Par série
    const serie = result.SERIE;
    if (!stats.parSerie[serie]) {
      stats.parSerie[serie] = { total: 0, admis: 0, taux: 0 };
    }
    stats.parSerie[serie].total++;
    if (result.Decision === 'Admis Sn') stats.parSerie[serie].admis++;

    // Par wilaya
    const wilaya = result.Wilaya_FR;
    if (!stats.parWilaya[wilaya]) {
      stats.parWilaya[wilaya] = { 
        total: 0, 
        admis: 0, 
        taux: 0,
        moyenne: 0,
        moyennes: []
      };
    }
    stats.parWilaya[wilaya].total++;
    stats.parWilaya[wilaya].moyennes.push(moyenne);
    if (result.Decision === 'Admis Sn') stats.parWilaya[wilaya].admis++;

    // Par établissement
    const etablissement = result.Etablissement_FR;
    if (!stats.parEtablissement[etablissement]) {
      stats.parEtablissement[etablissement] = { 
        total: 0, 
        admis: 0,
        moyennes: [],
        min: 20,
        max: 0
      };
    }
    stats.parEtablissement[etablissement].total++;
    stats.parEtablissement[etablissement].moyennes.push(moyenne);
    if (moyenne < stats.parEtablissement[etablissement].min) {
      stats.parEtablissement[etablissement].min = moyenne;
    }
    if (moyenne > stats.parEtablissement[etablissement].max) {
      stats.parEtablissement[etablissement].max = moyenne;
    }
    if (result.Decision === 'Admis Sn') stats.parEtablissement[etablissement].admis++;

    // Par centre d'examen
    const centre = result["Centre Examen  FR"];
    if (!stats.parCentre[centre]) {
      stats.parCentre[centre] = { total: 0, admis: 0 };
    }
    stats.parCentre[centre].total++;
    if (result.Decision === 'Admis Sn') stats.parCentre[centre].admis++;
  });

  // Moyennes globales et écart-type
  stats.global.tauxReussite = (stats.global.admis / stats.global.total) * 100;
  stats.moyennes.generale = totalMoyenne / results.length;
  stats.moyennes.admis = totalMoyenneAdmis / stats.global.admis;

  const mean = stats.moyennes.generale;
  const squaredDiffs = moyennes.map(m => Math.pow(m - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / moyennes.length;
  stats.moyennes.ecartType = Math.sqrt(variance);

  // Taux par série
  Object.keys(stats.parSerie).forEach(serie => {
    stats.parSerie[serie].taux = (stats.parSerie[serie].admis / stats.parSerie[serie].total) * 100;
  });

  // Moyennes et taux par wilaya
  Object.keys(stats.parWilaya).forEach(wilaya => {
    const w = stats.parWilaya[wilaya];
    w.taux = (w.admis / w.total) * 100;
    w.moyenne = w.moyennes.reduce((a, b) => a + b, 0) / w.moyennes.length;
  });

  // Top 10 global
  stats.top10 = [...results]
    .map(r => ({
      ...r,
      Moy_Bac: toFloat(r.Moy_Bac)
    }))
    .sort((a, b) => b.Moy_Bac - a.Moy_Bac)
    .slice(0, 10);

  // Top 10 par wilaya
  stats.top10Wilaya = {};
  Object.keys(stats.parWilaya).forEach(wilaya => {
    stats.top10Wilaya[wilaya] = results
      .filter(r => r.Wilaya_FR === wilaya)
      .map(r => ({
        ...r,
        Moy_Bac: toFloat(r.Moy_Bac)
      }))
      .sort((a, b) => b.Moy_Bac - a.Moy_Bac)
      .slice(0, 10);
  });

  // Sauvegarder les statistiques
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2), 'utf8');
  console.log(`✅ Statistiques calculées et sauvegardées dans ${statsFile}`);
}

calculateStats();
