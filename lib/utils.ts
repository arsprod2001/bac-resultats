// lib/utils.ts

type ClassValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | Record<string, boolean> 
  | ClassValue[];

/**
 * Combinaison intelligente de classes CSS avec gestion conditionnelle
 * 
 * @example 
 * cn('btn', ['px-4', 'py-2'], { 'bg-blue-500': isActive, 'text-white': isActive })
 * 
 * @param inputs Classes CSS à combiner
 * @returns Chaîne de classes combinées
 */
export function cn(...inputs: ClassValue[]): string {
  const result: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      result.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) result.push(inner);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) result.push(key);
      }
    }
  }

  return result.filter(Boolean).join(' ');
}

/**
 * Formatage des nombres avec séparateur de milliers
 * 
 * @example 
 * formatNumber(3500) // "3 500"
 * 
 * @param num Nombre à formater
 * @returns Chaîne formatée
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Génération d'un identifiant unique
 * 
 * @example 
 * generateId() // "id-12a8b4"
 * 
 * @returns Identifiant unique
 */
export function generateId(): string {
  return 'id-' + Math.random().toString(36).substring(2, 8);
}

/**
 * Fonction de debounce pour limiter les appels fréquents
 * 
 * @example 
 * const debouncedSearch = debounce(searchHandler, 300);
 * 
 * @param func Fonction à débouncer
 * @param wait Délai d'attente en ms
 * @returns Fonction débouncée
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Formatage des dates
 * 
 * @example 
 * formatDate(new Date(), 'fr') // "28/07/2025"
 * 
 * @param date Date à formater
 * @param locale Locale (fr, ar, en)
 * @returns Date formatée
 */
export function formatDate(date: Date, locale: string = 'fr'): string {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
}

/**
 * Conversion de chaîne en slug URL-friendly
 * 
 * @example 
 * toSlug('Résultats du Bac') // "resultats-du-bac"
 * 
 * @param str Chaîne à convertir
 * @returns Slug formaté
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
