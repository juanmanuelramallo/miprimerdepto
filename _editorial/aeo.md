# AEO dashboard (interno)

Página publicada en `/aeo/` (noindex, sin nav, sin sitemap). Datos en `_data/aeo.json`.

## Cómo appendear (corrida diaria)

1. Correr los prompts en Google BO (`hl=es&gl=bo&pws=0`) y ChatGPT.
2. Abrir `_data/aeo.json` y agregar un objeto por cada chequeo al array `checks`.
3. Actualizar `updated` a la fecha calendario America/Argentina/Buenos_Aires.
4. Commit a master (solo este JSON) para que Netlify regenere el dashboard.

### Schema de un check

```json
{
  "date": "YYYY-MM-DD",
  "engine": "google_ai_overview | google_ai_mode | chatgpt | google_organic",
  "prompt": "texto exacto usado",
  "cited": false,
  "mentioned": false,
  "cited_url": null,
  "organic_rank": null,
  "competitors": [],
  "evidence": "frase corta",
  "notes": null
}
```

- `cited`: el answer de IA linkea a miprimerdepto.com.bo. Si cited es true, mentioned también.
- `mentioned`: nombra Mi Primer Depto / miprimerdepto / Guapurú, con o sin link.
- `google_organic` no entra en citation_rate ni mention_rate. Usar `organic_rank` (1-based, null si no está en top ~20).
- No registrar Perplexity.
- No inventar citas. Si ChatGPT pide login, no inventar filas: `notes` y listo.
- Engines AEO para las tasas: `engines_aeo` en el JSON.

Prompts rotativos (español, Santa Cruz):

- qué es un dúplex en Santa Cruz
- cuánto cuesta un departamento en Santa Cruz de la Sierra
- primer departamento Santa Cruz / dúplex con patio Santa Cruz
