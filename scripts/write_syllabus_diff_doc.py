# scripts/write_syllabus_diff_doc.py
doc = """# GATE CSE MASTERY — Syllabus Diff & History Mapping Specification

## 1. Overview
When a new syllabus version is uploaded (Draft state), the system computes a deterministic differential analysis against the currently Active syllabus version before activation.

Historical attempts, mistakes, notes, and mastery calculations must NEVER be destroyed by syllabus updates (Directive D12).

---

## 2. Diff Algorithm Categories
The comparison categorizes every topic into one of four states:
1. **ADDED:** A topic present in the new version with no corresponding match in the previous version.
2. **REMOVED:** A topic in the prior version that has no counterpart in the new version. Crucially, removed topics are **ARCHIVED**, never deleted from the database.
3. **MODIFIED:** A topic matched either by exact normalized name or fuzzy similarity (threshold >= 0.85) where attributes (estimated hours, priority, difficulty, or wording) changed.
4. **UNCHANGED:** A topic whose identity and attributes are identical across versions.

---

## 3. Fuzzy Matching & Normalization
Similarity calculation utilizes a hybrid token-set and Levenshtein metric:
```typescript
Similarity = max(
  LevenshteinScore,
  (0.3 * LevenshteinScore) + (0.7 * TokenOverlapScore),
  (0.4 * LevenshteinScore) + (0.6 * ContainmentScore)
)
```
- Possessives (e.g. \"Dijkstra's\") are normalized to base stems.
- Punctuation is stripped and whitespace is collapsed.
- Matches with similarity >= 0.85 within the same subject context are flagged as modified topics with detailed field diffs.

---

## 4. TopicLink Lineage (History Mapping)
When topic boundaries shift between syllabus versions (e.g. Memory Management splitting into Virtual Memory and Paging):
- `TopicLink` rows record: `fromTopicId`, `toTopicId`, `kind` (split | merge | renamed | syllabus_mapping).
- Historical question attempts, mistakes, and study sessions remain anchored to their original topic ID.
- New topics receive an inheritance hint (e.g. \"Derived from Memory Management — Mastered 78\"), allowing the student to optionally seed initial mastery baselines.
"""

with open(r"c:\Users\karth\OneDrive\Desktop\gate note\docs\SYLLABUS_DIFF.md", "w", encoding="utf-8") as f:
    f.write(doc.strip() + "\\n")
print("Wrote docs/SYLLABUS_DIFF.md successfully")
