# scripts/update_diff.py
import re

ts_file = r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\syllabus\diff.ts"
with open(ts_file, "r", encoding="utf-8") as f:
    content = f.read()

new_norm_and_sim = """export function normalizeString(str: string): string {
  return str
    .replace(/'s\\b/gi, '')
    .toLowerCase()
    .replace(/[^a-z0-9\\s]/g, ' ')
    .trim()
    .replace(/\\s+/g, ' ');
}

export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

export function computeStringSimilarity(s1: string, s2: string): number {
  const n1 = normalizeString(s1);
  const n2 = normalizeString(s2);
  if (n1 === n2) return 1.0;
  if (!n1.length || !n2.length) return 0.0;

  const t1 = new Set(n1.split(' ').filter(Boolean));
  const t2 = new Set(n2.split(' ').filter(Boolean));
  const intersection = new Set([...t1].filter(x => t2.has(x)));
  const minLen = Math.min(t1.size, t2.size);
  const tokenScore = minLen > 0 ? intersection.size / minLen : 0;

  const maxLen = Math.max(n1.length, n2.length);
  const levScore = 1.0 - (levenshteinDistance(n1, n2) / maxLen);

  const containScore = (n1.includes(n2) || n2.includes(n1)) ? 1.0 : 0.0;

  return Math.max(
    levScore,
    (0.3 * levScore) + (0.7 * tokenScore),
    (0.4 * levScore) + (0.6 * containScore)
  );
}"""

pattern = r'export function normalizeString[\s\S]*?return Math\.max[\s\S]*?\);\n\}'
if not re.search(pattern, content):
    pattern = r'export function normalizeString[\s\S]*?export function diffSyllabusVersions'
    replacement = new_norm_and_sim + "\n\nexport function diffSyllabusVersions"
    content = re.sub(pattern, replacement, content, count=1)
else:
    content = re.sub(pattern, new_norm_and_sim, content, count=1)

with open(ts_file, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated diff.ts successfully")
