import json
import urllib.request
import urllib.error
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

# ── VEHICLE DATA ─────────────────────────────────
CARS = {
    'nexon-ev':      { 'name': 'Tata Nexon EV',            'brand': 'Tata Motors',   'type': 'ev',     'mfg': 12, 'kwhPer100km': 14, 'lPer100km': None, 'battDisp': 8,  'price': '₹14–20L', 'tier': 'mid',  'rating': 'A'  },
    'mg-zs-ev':      { 'name': 'MG ZS EV',                 'brand': 'MG Motors',     'type': 'ev',     'mfg': 14, 'kwhPer100km': 15, 'lPer100km': None, 'battDisp': 9,  'price': '₹18–25L', 'tier': 'mid',  'rating': 'A'  },
    'tiago-ev':      { 'name': 'Tata Tiago EV',            'brand': 'Tata Motors',   'type': 'ev',     'mfg': 10, 'kwhPer100km': 13, 'lPer100km': None, 'battDisp': 6,  'price': '₹8–12L',  'tier': 'low',  'rating': 'A'  },
    'byd-atto3':     { 'name': 'BYD Atto 3',               'brand': 'BYD',           'type': 'ev',     'mfg': 15, 'kwhPer100km': 16, 'lPer100km': None, 'battDisp': 11, 'price': '₹34–38L', 'tier': 'high', 'rating': 'A'  },
    'tesla-model3':  { 'name': 'Tesla Model 3',            'brand': 'Tesla',         'type': 'ev',     'mfg': 16, 'kwhPer100km': 13, 'lPer100km': None, 'battDisp': 10, 'price': '₹40–60L', 'tier': 'high', 'rating': 'A'  },
    'prius':         { 'name': 'Toyota Prius',              'brand': 'Toyota',        'type': 'hybrid', 'mfg': 8,  'kwhPer100km': None, 'lPer100km': 3.5, 'battDisp': 3, 'price': '₹42–50L', 'tier': 'high', 'rating': 'A+' },
    'city-hybrid':   { 'name': 'Honda City Hybrid',        'brand': 'Honda',         'type': 'hybrid', 'mfg': 7,  'kwhPer100km': None, 'lPer100km': 4.0, 'battDisp': 2, 'price': '₹19–21L', 'tier': 'mid',  'rating': 'A'  },
    'vitara-hybrid': { 'name': 'Maruti Grand Vitara Hybrid','brand': 'Maruti Suzuki', 'type': 'hybrid', 'mfg': 9,  'kwhPer100km': None, 'lPer100km': 4.8, 'battDisp': 2, 'price': '₹16–24L', 'tier': 'mid',  'rating': 'A'  },
    'swift':         { 'name': 'Maruti Swift',             'brand': 'Maruti Suzuki', 'type': 'ice',    'mfg': 5,  'kwhPer100km': None, 'lPer100km': 5.8, 'battDisp': 0,  'price': '₹6–9L',   'tier': 'low',  'rating': 'B'  },
    'creta':         { 'name': 'Hyundai Creta',            'brand': 'Hyundai',       'type': 'ice',    'mfg': 6,  'kwhPer100km': None, 'lPer100km': 8.5, 'battDisp': 0,  'price': '₹11–20L', 'tier': 'mid',  'rating': 'C'  },
    'innova':        { 'name': 'Toyota Innova Crysta',     'brand': 'Toyota',        'type': 'ice',    'mfg': 7,  'kwhPer100km': None, 'lPer100km': 10.5,'battDisp': 0,  'price': '₹20–27L', 'tier': 'mid',  'rating': 'C'  },
    'brezza':        { 'name': 'Maruti Brezza',            'brand': 'Maruti Suzuki', 'type': 'ice',    'mfg': 5,  'kwhPer100km': None, 'lPer100km': 7.2, 'battDisp': 0,  'price': '₹8–14L',  'tier': 'mid',  'rating': 'B'  },
}

GRID_DATA = {
    # India states
    'MH': 0.82, 'JH': 1.10, 'MP': 0.96, 'DL': 0.78, 'RJ': 0.85, 'UP': 0.90,
    'GJ': 0.75, 'TN': 0.62, 'KA': 0.55, 'KL': 0.18, 'HP': 0.12, 'UK': 0.15,
    'PB': 0.70, 'WB': 0.88, 'AP': 0.68, 'TS': 0.72, 'OR': 0.95, 'GA': 0.60,
    # Countries
    'norway': 0.02, 'france': 0.06, 'switzerland': 0.07, 'sweden': 0.08,
    'austria': 0.14, 'finland': 0.12, 'uk': 0.23, 'netherlands': 0.28,
    'denmark': 0.19, 'portugal': 0.18, 'spain': 0.22, 'belgium': 0.17,
    'germany': 0.38, 'ireland': 0.31, 'italy': 0.29, 'greece': 0.39,
    'czechia': 0.41, 'poland': 0.72, 'romania': 0.26, 'ukraine': 0.35,
    'turkey': 0.46, 'usa': 0.42, 'canada': 0.14, 'brazil': 0.09,
    'mexico': 0.46, 'argentina': 0.31, 'chile': 0.28, 'colombia': 0.17,
    'china': 0.61, 'japan': 0.47, 'south_korea': 0.44, 'singapore': 0.41,
    'thailand': 0.52, 'vietnam': 0.55, 'indonesia': 0.71, 'malaysia': 0.63,
    'bangladesh': 0.59, 'pakistan': 0.45, 'sri_lanka': 0.38, 'uae': 0.40,
    'saudi': 0.68, 'israel': 0.43, 'south_africa': 0.92, 'nigeria': 0.43,
    'kenya': 0.04, 'egypt': 0.48, 'australia': 0.55, 'new_zealand': 0.10,
    'india': 0.82,
}

GREENWASH_FLAGS = [
    ('zero emission',    -18, '"Zero emissions" ignores manufacturing & battery disposal'),
    ('carbon neutral',   -22, '"Carbon neutral" claims rarely include supply chain'),
    ('eco mode',          -8, '"Eco mode" savings are lab-tested, not real-world'),
    ('green future',      -8, 'Vague "green future" language without lifecycle data'),
    ('clean energy',      -8, '"Clean energy" depends entirely on your grid source'),
    ('sustainable',       -5, 'Unverified "sustainable" claim — no data provided'),
    ('co2 free',         -20, 'No car is CO₂-free when manufacturing is included'),
    ('100%',             -10, 'Absolute % claims are rarely lifecycle-verified'),
    ('net zero',         -15, '"Net zero" — by when? By whose accounting?'),
    ('green',             -6, 'Vague "green" language without supporting data'),
    ('third party',      +10, None),
    ('verified',          +8, None),
    ('lifecycle',        +12, None),
    ('independent audit',+10, None),
]

AI_SYSTEM = """You are CarbonWise AI — a concise expert on vehicle lifecycle carbon emissions in India and globally.
Key data:
- Vehicle lifecycle CO2 (mfg + fuel/energy + battery disposal, Maharashtra 0.82 grid, 40km/day, 8yr):
  Toyota Prius Hybrid: 16t | Tata Nexon EV: 21t | Honda City Hybrid: 24t | MG ZS EV: 32t | Grand Vitara Hybrid: 28t | Maruti Swift ICE: 57t | Hyundai Creta ICE: 74t | Innova ICE: 85t
- India state grids (kg CO2/kWh): HP 0.12, KL 0.18, DL 0.78, MH 0.82, MP 0.96, JH 1.10
- Global grids: Norway 0.02, France 0.06, UK 0.23, Germany 0.38, USA 0.42, China 0.61
- EV formula: (kWh/100km / 100) × grid × total_km
- ICE formula: (L/100km / 100) × 2.31 × total_km
Rules: Give specific numbers. Max 3 short paragraphs. Be direct and opinionated. Always adjust for the user's grid if mentioned."""


def calc_lifecycle(car_key, grid_intensity, km_per_day, years):
    car = CARS.get(car_key)
    if not car:
        return None
    total_km = km_per_day * 365 * years
    if car['type'] == 'ev':
        fuel_co2 = (car['kwhPer100km'] / 100) * grid_intensity * total_km
    else:
        fuel_co2 = (car['lPer100km'] / 100) * 2.31 * total_km
    total = car['mfg'] + fuel_co2 + car['battDisp']
    return {
        'key': car_key,
        'name': car['name'],
        'brand': car['brand'],
        'type': car['type'],
        'price': car['price'],
        'rating': car['rating'],
        'mfg': car['mfg'],
        'battDisp': car['battDisp'],
        'fuel': round(fuel_co2, 1),
        'total': round(total, 1),
    }


def call_groq(messages):
    """Call Groq API using only stdlib — no requests needed."""
    api_key = settings.GROQ_API_KEY
    if not api_key or api_key == 'paste_your_groq_key_here':
        return "AI is not configured. Please set GROQ_API_KEY in settings.py or as an environment variable."

    payload = json.dumps({
        'model': settings.GROQ_MODEL,
        'max_tokens': 400,
        'messages': messages,
    }).encode('utf-8')

    req = urllib.request.Request(
        'https://api.groq.com/openai/v1/chat/completions',
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}',
            'User-Agent': 'python-urllib/3',
        },
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            data = json.loads(response.read())
            return data['choices'][0]['message']['content']
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        return f'AI error: {e.code} — {body[:200]}'
    except Exception as e:
        return f'AI connection error: {str(e)}'


# ── VIEWS ────────────────────────────────────────

@csrf_exempt
@require_http_methods(['POST'])
def chat(request):
    """AI chat endpoint — proxies to Groq."""
    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    user_message = body.get('message', '').strip()
    if not user_message:
        return JsonResponse({'error': 'message required'}, status=400)

    context = body.get('context', '')
    history = body.get('history', [])

    messages = [{'role': 'system', 'content': AI_SYSTEM}]
    for h in history[-6:]:  # keep last 6 turns only
        if h.get('role') in ('user', 'assistant') and h.get('text'):
            messages.append({'role': h['role'] if h['role'] != 'ai' else 'assistant', 'content': h['text']})

    if context:
        user_message = f"{user_message}\n\n[Context: {context}]"

    messages.append({'role': 'user', 'content': user_message})

    reply = call_groq(messages)
    return JsonResponse({'reply': reply})


@csrf_exempt
@require_http_methods(['POST'])
def lifecycle(request):
    """Calculate lifecycle CO2 for a list of cars."""
    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    car_keys     = body.get('cars', [])
    grid_key     = body.get('grid', 'MH')
    km_per_day   = float(body.get('km', 40))
    years        = float(body.get('years', 8))

    grid_intensity = GRID_DATA.get(grid_key, 0.82)
    results = []
    for key in car_keys:
        calc = calc_lifecycle(key, grid_intensity, km_per_day, years)
        if calc:
            results.append(calc)

    results.sort(key=lambda x: x['total'])
    return JsonResponse({'results': results, 'grid_intensity': grid_intensity})


@csrf_exempt
@require_http_methods(['POST'])
def greenwash(request):
    """Score a marketing claim for greenwashing."""
    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    text  = body.get('text', '').lower()
    score = 70
    flags = []

    for term, pts, msg in GREENWASH_FLAGS:
        if term in text:
            score += pts
            if msg:
                flags.append(msg)

    score = max(5, min(95, score))
    verdict = 'honest' if score > 65 else 'misleading' if score > 40 else 'greenwashing'
    return JsonResponse({'score': score, 'flags': flags, 'verdict': verdict})


@require_http_methods(['GET'])
def cars_list(request):
    """Return list of all cars in the database."""
    return JsonResponse({
        'cars': [
            {'key': k, 'name': v['name'], 'brand': v['brand'],
             'type': v['type'], 'price': v['price'], 'rating': v['rating']}
            for k, v in CARS.items()
        ]
    })


@require_http_methods(['GET'])
def grids_list(request):
    """Return all available grid regions."""
    from django.conf import settings
    grids = {k: v for k, v in GRID_DATA.items()}
    return JsonResponse({'grids': grids})


@require_http_methods(['GET'])
def health(request):
    """Health check endpoint."""
    return JsonResponse({'status': 'ok', 'version': '1.0.0', 'project': 'CarbonWise'})
