// ─────────────────────────────────────────────
//  CarbonWise — Master Data
// ─────────────────────────────────────────────

export const CARS = {
  'nexon-ev':       { name: 'Tata Nexon EV',            brand: 'Tata Motors',    type: 'ev',     mfg: 12, kwhPer100km: 14, lPer100km: null, battDisp: 8,  price: '₹14–20L', tier: 'mid',  rating: 'A',  year: 2024 },
  'mg-zs-ev':       { name: 'MG ZS EV',                 brand: 'MG Motors',      type: 'ev',     mfg: 14, kwhPer100km: 15, lPer100km: null, battDisp: 9,  price: '₹18–25L', tier: 'mid',  rating: 'A',  year: 2024 },
  'tiago-ev':       { name: 'Tata Tiago EV',            brand: 'Tata Motors',    type: 'ev',     mfg: 10, kwhPer100km: 13, lPer100km: null, battDisp: 6,  price: '₹8–12L',  tier: 'low',  rating: 'A',  year: 2024 },
  'byd-atto3':      { name: 'BYD Atto 3',               brand: 'BYD',            type: 'ev',     mfg: 15, kwhPer100km: 16, lPer100km: null, battDisp: 11, price: '₹34–38L', tier: 'high', rating: 'A',  year: 2024 },
  'tesla-model3':   { name: 'Tesla Model 3',            brand: 'Tesla',          type: 'ev',     mfg: 16, kwhPer100km: 13, lPer100km: null, battDisp: 10, price: '₹40–60L', tier: 'high', rating: 'A',  year: 2024 },
  'prius':          { name: 'Toyota Prius',              brand: 'Toyota',         type: 'hybrid', mfg: 8,  kwhPer100km: null, lPer100km: 3.5, battDisp: 3, price: '₹42–50L', tier: 'high', rating: 'A+', year: 2024 },
  'city-hybrid':    { name: 'Honda City Hybrid',        brand: 'Honda',          type: 'hybrid', mfg: 7,  kwhPer100km: null, lPer100km: 4.0, battDisp: 2, price: '₹19–21L', tier: 'mid',  rating: 'A',  year: 2024 },
  'vitara-hybrid':  { name: 'Maruti Grand Vitara Hybrid', brand: 'Maruti Suzuki', type: 'hybrid', mfg: 9,  kwhPer100km: null, lPer100km: 4.8, battDisp: 2, price: '₹16–24L', tier: 'mid',  rating: 'A',  year: 2024 },
  'camry-hybrid':   { name: 'Toyota Camry Hybrid',      brand: 'Toyota',         type: 'hybrid', mfg: 10, kwhPer100km: null, lPer100km: 4.2, battDisp: 3, price: '₹46–50L', tier: 'high', rating: 'A',  year: 2024 },
  'swift':          { name: 'Maruti Swift',             brand: 'Maruti Suzuki',  type: 'ice',    mfg: 5,  kwhPer100km: null, lPer100km: 5.8, battDisp: 0, price: '₹6–9L',   tier: 'low',  rating: 'B',  year: 2024 },
  'creta':          { name: 'Hyundai Creta',            brand: 'Hyundai',        type: 'ice',    mfg: 6,  kwhPer100km: null, lPer100km: 8.5, battDisp: 0, price: '₹11–20L', tier: 'mid',  rating: 'C',  year: 2024 },
  'innova':         { name: 'Toyota Innova Crysta',     brand: 'Toyota',         type: 'ice',    mfg: 7,  kwhPer100km: null, lPer100km: 10.5, battDisp: 0, price: '₹20–27L', tier: 'mid', rating: 'C',  year: 2024 },
  'brezza':         { name: 'Maruti Brezza',            brand: 'Maruti Suzuki',  type: 'ice',    mfg: 5,  kwhPer100km: null, lPer100km: 7.2, battDisp: 0, price: '₹8–14L',  tier: 'mid',  rating: 'B',  year: 2024 },
  'seltos':         { name: 'Kia Seltos',               brand: 'Kia',            type: 'ice',    mfg: 6,  kwhPer100km: null, lPer100km: 8.0, battDisp: 0, price: '₹11–20L', tier: 'mid',  rating: 'C',  year: 2024 },
};

// ── GRID INTENSITY DATA ─────────────────────────
// Source: IEA, CEA India, national energy authorities
// Unit: kg CO₂ per kWh

export const GRID_DATA = {
  // ── INDIA (state-wise) ──────────────────────
  india: {
    label: '🇮🇳 India',
    isCountry: true,
    states: {
      MH: { label: 'Maharashtra',      intensity: 0.82, source: 'CEA 2023' },
      JH: { label: 'Jharkhand',        intensity: 1.10, source: 'CEA 2023' },
      MP: { label: 'Madhya Pradesh',   intensity: 0.96, source: 'CEA 2023' },
      DL: { label: 'Delhi',            intensity: 0.78, source: 'CEA 2023' },
      RJ: { label: 'Rajasthan',        intensity: 0.85, source: 'CEA 2023' },
      UP: { label: 'Uttar Pradesh',    intensity: 0.90, source: 'CEA 2023' },
      GJ: { label: 'Gujarat',          intensity: 0.75, source: 'CEA 2023' },
      TN: { label: 'Tamil Nadu',       intensity: 0.62, source: 'CEA 2023' },
      KA: { label: 'Karnataka',        intensity: 0.55, source: 'CEA 2023' },
      KL: { label: 'Kerala',           intensity: 0.18, source: 'CEA 2023' },
      HP: { label: 'Himachal Pradesh', intensity: 0.12, source: 'CEA 2023' },
      UK: { label: 'Uttarakhand',      intensity: 0.15, source: 'CEA 2023' },
      PB: { label: 'Punjab',           intensity: 0.70, source: 'CEA 2023' },
      WB: { label: 'West Bengal',      intensity: 0.88, source: 'CEA 2023' },
      AP: { label: 'Andhra Pradesh',   intensity: 0.68, source: 'CEA 2023' },
      TS: { label: 'Telangana',        intensity: 0.72, source: 'CEA 2023' },
      OR: { label: 'Odisha',           intensity: 0.95, source: 'CEA 2023' },
      GA: { label: 'Goa',              intensity: 0.60, source: 'CEA 2023' },
    }
  },

  // ── ASIA ────────────────────────────────────
  china:       { label: '🇨🇳 China',        intensity: 0.61, source: 'IEA 2023' },
  japan:       { label: '🇯🇵 Japan',        intensity: 0.47, source: 'IEA 2023' },
  south_korea: { label: '🇰🇷 South Korea',  intensity: 0.44, source: 'IEA 2023' },
  singapore:   { label: '🇸🇬 Singapore',    intensity: 0.41, source: 'IEA 2023' },
  thailand:    { label: '🇹🇭 Thailand',     intensity: 0.52, source: 'IEA 2023' },
  vietnam:     { label: '🇻🇳 Vietnam',      intensity: 0.55, source: 'IEA 2023' },
  indonesia:   { label: '🇮🇩 Indonesia',    intensity: 0.71, source: 'IEA 2023' },
  malaysia:    { label: '🇲🇾 Malaysia',     intensity: 0.63, source: 'IEA 2023' },
  bangladesh:  { label: '🇧🇩 Bangladesh',   intensity: 0.59, source: 'IEA 2023' },
  pakistan:    { label: '🇵🇰 Pakistan',     intensity: 0.45, source: 'IEA 2023' },
  sri_lanka:   { label: '🇱🇰 Sri Lanka',    intensity: 0.38, source: 'IEA 2023' },
  uae:         { label: '🇦🇪 UAE',          intensity: 0.40, source: 'IEA 2023' },
  saudi:       { label: '🇸🇦 Saudi Arabia', intensity: 0.68, source: 'IEA 2023' },
  israel:      { label: '🇮🇱 Israel',       intensity: 0.43, source: 'IEA 2023' },

  // ── EUROPE ──────────────────────────────────
  norway:      { label: '🇳🇴 Norway',       intensity: 0.02, source: 'IEA 2023' },
  france:      { label: '🇫🇷 France',       intensity: 0.06, source: 'IEA 2023' },
  switzerland: { label: '🇨🇭 Switzerland',  intensity: 0.07, source: 'IEA 2023' },
  sweden:      { label: '🇸🇪 Sweden',       intensity: 0.08, source: 'IEA 2023' },
  austria:     { label: '🇦🇹 Austria',      intensity: 0.14, source: 'IEA 2023' },
  portugal:    { label: '🇵🇹 Portugal',     intensity: 0.18, source: 'IEA 2023' },
  spain:       { label: '🇪🇸 Spain',        intensity: 0.22, source: 'IEA 2023' },
  denmark:     { label: '🇩🇰 Denmark',      intensity: 0.19, source: 'IEA 2023' },
  finland:     { label: '🇫🇮 Finland',      intensity: 0.12, source: 'IEA 2023' },
  germany:     { label: '🇩🇪 Germany',      intensity: 0.38, source: 'IEA 2023' },
  uk:          { label: '🇬🇧 United Kingdom', intensity: 0.23, source: 'IEA 2023' },
  ireland:     { label: '🇮🇪 Ireland',      intensity: 0.31, source: 'IEA 2023' },
  netherlands: { label: '🇳🇱 Netherlands',  intensity: 0.28, source: 'IEA 2023' },
  belgium:     { label: '🇧🇪 Belgium',      intensity: 0.17, source: 'IEA 2023' },
  italy:       { label: '🇮🇹 Italy',        intensity: 0.29, source: 'IEA 2023' },
  greece:      { label: '🇬🇷 Greece',       intensity: 0.39, source: 'IEA 2023' },
  poland:      { label: '🇵🇱 Poland',       intensity: 0.72, source: 'IEA 2023' },
  czechia:     { label: '🇨🇿 Czechia',      intensity: 0.41, source: 'IEA 2023' },
  romania:     { label: '🇷🇴 Romania',      intensity: 0.26, source: 'IEA 2023' },
  ukraine:     { label: '🇺🇦 Ukraine',      intensity: 0.35, source: 'IEA 2023' },
  turkey:      { label: '🇹🇷 Turkey',       intensity: 0.46, source: 'IEA 2023' },

  // ── AMERICAS ────────────────────────────────
  usa:         { label: '🇺🇸 USA',          intensity: 0.42, source: 'EPA 2023' },
  canada:      { label: '🇨🇦 Canada',       intensity: 0.14, source: 'IEA 2023' },
  brazil:      { label: '🇧🇷 Brazil',       intensity: 0.09, source: 'IEA 2023' },
  mexico:      { label: '🇲🇽 Mexico',       intensity: 0.46, source: 'IEA 2023' },
  argentina:   { label: '🇦🇷 Argentina',    intensity: 0.31, source: 'IEA 2023' },
  chile:       { label: '🇨🇱 Chile',        intensity: 0.28, source: 'IEA 2023' },
  colombia:    { label: '🇨🇴 Colombia',     intensity: 0.17, source: 'IEA 2023' },

  // ── AFRICA / OCEANIA ────────────────────────
  south_africa:{ label: '🇿🇦 South Africa', intensity: 0.92, source: 'IEA 2023' },
  nigeria:     { label: '🇳🇬 Nigeria',      intensity: 0.43, source: 'IEA 2023' },
  kenya:       { label: '🇰🇪 Kenya',        intensity: 0.04, source: 'IEA 2023' },
  egypt:       { label: '🇪🇬 Egypt',        intensity: 0.48, source: 'IEA 2023' },
  australia:   { label: '🇦🇺 Australia',    intensity: 0.55, source: 'IEA 2023' },
  new_zealand: { label: '🇳🇿 New Zealand',  intensity: 0.10, source: 'IEA 2023' },
};

// ── GREENWASHING DATABASE ───────────────────────
export const GREENWASH_DB = [
  { brand: 'Hyundai', model: 'Creta', claim: '"Eco Mode saves 40%"', reality: 'Real-world saving: 8–13%. Lab test, not road test.', severity: 'high' },
  { brand: 'Toyota',  model: 'Fortuner', claim: '"Green for the Future"', reality: 'No lifecycle data published. Marketing tagline only.', severity: 'medium' },
  { brand: 'Maruti',  model: 'Baleno', claim: '"Low CO₂ Champion"', reality: 'Tailpipe only. Manufacturing = 5t CO₂ unreported.', severity: 'medium' },
  { brand: 'MG',      model: 'Hector', claim: '"Internet Car, Clean Future"', reality: '2.0L petrol engine. 9.2 L/100km real world.', severity: 'high' },
  { brand: 'Kia',     model: 'Seltos', claim: '"Drive Green, Live Clean"', reality: '8.0 L/100km petrol. No hybrid option at launch.', severity: 'medium' },
];

// ── RED FLAG KEYWORDS FOR GREENWASH DETECTOR ───
export const GREENWASH_FLAGS = [
  { term: 'zero emission',    score: -18, msg: '"Zero emissions" ignores manufacturing & battery disposal' },
  { term: 'carbon neutral',   score: -22, msg: '"Carbon neutral" claims rarely include supply chain' },
  { term: 'eco mode',         score: -8,  msg: '"Eco mode" savings are lab-tested, not real-world' },
  { term: 'green future',     score: -8,  msg: 'Vague "green future" language without lifecycle data' },
  { term: 'clean energy',     score: -8,  msg: '"Clean energy" depends entirely on your grid source' },
  { term: 'sustainable',      score: -5,  msg: 'Unverified "sustainable" claim — no data provided' },
  { term: 'co2 free',         score: -20, msg: 'No car is CO₂-free when manufacturing is included' },
  { term: '100%',             score: -10, msg: 'Absolute % claims are rarely lifecycle-verified' },
  { term: 'net zero',         score: -15, msg: '"Net zero" by when? By whose accounting?' },
  { term: 'green',            score: -6,  msg: 'Vague "green" language without supporting data' },
  { term: 'third party',      score: +10, msg: null },
  { term: 'verified',         score: +8,  msg: null },
  { term: 'lifecycle',        score: +12, msg: null },
  { term: 'independent audit', score: +10, msg: null },
];

// ── HELPER: calculate lifecycle CO2 ────────────
export function calcLifecycle(carKey, gridIntensity, kmPerDay, years) {
  const car = CARS[carKey];
  if (!car) return null;
  const totalKm = kmPerDay * 365 * years;
  let fuelCO2;
  if (car.type === 'ev') {
    fuelCO2 = (car.kwhPer100km / 100) * gridIntensity * totalKm;
  } else {
    fuelCO2 = (car.lPer100km / 100) * 2.31 * totalKm;
  }
  return {
    ...car,
    key: carKey,
    fuel: Math.round(fuelCO2 * 10) / 10,
    total: Math.round((car.mfg + fuelCO2 + car.battDisp) * 10) / 10,
  };
}

// ── HELPER: get grid intensity ──────────────────
export function getGridIntensity(countryKey, stateKey) {
  if (countryKey === 'india' && stateKey) {
    return GRID_DATA.india.states[stateKey]?.intensity ?? 0.82;
  }
  return GRID_DATA[countryKey]?.intensity ?? 0.42;
}

// ── RATING helper ───────────────────────────────
export function getRating(total) {
  if (total <= 20) return 'A+';
  if (total <= 30) return 'A';
  if (total <= 45) return 'B';
  if (total <= 65) return 'C';
  return 'D';
}
