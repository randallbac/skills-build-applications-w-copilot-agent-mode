/**
 * Resolves the OctoFit API base URL.
 *
 * Set VITE_CODESPACE_NAME in .env.local when running in a Codespace:
 *   VITE_CODESPACE_NAME=your-codespace-name
 *
 * When unset, falls back to http://localhost:8000 to avoid
 * "https://undefined-8000.app.github.dev" requests.
 */
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

/** Normalise API responses that may be an array or a paginated object. */
export function toArray(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}
