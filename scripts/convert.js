const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const xlsx = require('xlsx');

// Table de correspondance des noms de colonnes (clé = alias, valeur = nom standard)
const columnMapping = {

};

// Convertit une date Excel (numérique) en objet Date JS
function excelDateToJSDate(serial) {
  const excelEpoch = new Date(1899, 11, 30);
  return new Date(excelEpoch.getTime() + serial * 86400000);
}

function parseDate(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number' && !isNaN(value)) {
    const date = excelDateToJSDate(value);
    return isNaN(date.getTime()) ? null : date;
  }
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  if (typeof value === 'string') {
    const parsed = Date.parse(value.replace(/(\d{2})[\/\-](\d{2})[\/\-](\d{4})/, '$3-$2-$1'));
    const date = new Date(parsed);
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const inputFile = process.argv[2] || 'FICHIER_RESULTATS_BAC_2025_53148.xlsx';
const outputFile = path.join(__dirname, '../public/results.json');

async function convertData() {
  try {
    let jsonData;

    if (inputFile.endsWith('.xlsx')) {
      const workbook = xlsx.readFile(inputFile);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      jsonData = xlsx.utils.sheet_to_json(worksheet);
    } else if (inputFile.endsWith('.csv')) {
      jsonData = await csv().fromFile(inputFile);
    } else {
      throw new Error('Format de fichier non supporté. Utilisez .xlsx ou .csv');
    }

    const cleanedData = jsonData.map(item => {
      const cleanedItem = {};
      for (const [key, value] of Object.entries(item)) {
        const originalKey = key.trim();
        const mappedKey = columnMapping[originalKey] || originalKey; // Applique le mapping si existant

        if (mappedKey.toLowerCase().includes('date')) {
          const parsedDate = parseDate(value);
          cleanedItem[mappedKey] = parsedDate ? formatDate(parsedDate) : value;
        } else {
          cleanedItem[mappedKey] = typeof value === 'string' ? value.trim() : value;
        }
      }
      return cleanedItem;
    });

    fs.writeFileSync(outputFile, JSON.stringify(cleanedData, null, 2), 'utf8');
    console.log(`✅ Conversion réussie : ${cleanedData.length} enregistrements sauvegardés dans ${outputFile}`);
  } catch (error) {
    console.error('❌ Erreur de conversion:', error.message);
    process.exit(1);
  }
}

convertData();
