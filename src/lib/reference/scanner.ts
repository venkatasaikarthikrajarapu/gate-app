export interface DocumentScanResult {
  filename: string;
  path: string;
  sizeBytes: number;
  docType: 'notes' | 'pyq' | 'question_bank' | 'book' | 'other';
  subjectsDetected: string[];
  topicsDetected: string[];
}

export interface TextChunkResult {
  chunkIndex: number;
  content: string;
  headingPath: string[];
  tokenCount: number;
  page?: number;
}

export interface KnowledgeLinkResult {
  documentId: string;
  topicId: string;
  confidence: 'high' | 'medium' | 'low';
  method: 'filename_heuristic' | 'heading_heuristic' | 'search_match';
}

export function classifyDocumentType(filename: string): DocumentScanResult['docType'] {
  const lower = filename.toLowerCase();
  if (lower.includes('pyq') || lower.includes('key') || lower.includes('questionpaper')) return 'pyq';
  if (lower.includes('mock') || lower.includes('solution')) return 'question_bank';
  if (lower.includes('ngtl') || lower.includes('textbook')) return 'book';
  if (lower.includes('note') || lower.includes('short')) return 'notes';
  return 'other';
}

export function detectSubjectsFromTitle(filename: string): string[] {
  const lower = filename.toLowerCase();
  const subjects: string[] = [];
  const keywordsMap: Record<string, string> = {
    'algorithm': 'subl-algo',
    'c program': 'subl-prog',
    'programming': 'subl-prog',
    'osn': 'subl-os',
    'operating system': 'subl-os',
    'dbms': 'subl-db',
    'database': 'subl-db',
    'network': 'subl-cn',
    'computer network': 'subl-cn',
    'coa': 'subl-coa',
    'architecture': 'subl-coa',
    'discrete': 'subl-dm',
    'toc': 'subl-toc',
    'compiler': 'subl-cd',
    'aptitude': 'subl-ga'
  };
  for (const [key, subjId] of Object.entries(keywordsMap)) {
    if (lower.includes(key) && !subjects.includes(subjId)) {
      subjects.push(subjId);
    }
  }
  return subjects;
}

export function chunkTextBySections(
  rawText: string,
  defaultHeading: string = 'Content',
  maxChunkChars: number = 1000
): TextChunkResult[] {
  if (!rawText || rawText.trim().length === 0) return [];

  const paragraphs = rawText.split(/\n\s*\n/);
  const chunks: TextChunkResult[] = [];
  let currentChunk = '';
  let chunkIdx = 0;

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    if (currentChunk.length + trimmed.length < maxChunkChars) {
      currentChunk += (currentChunk ? '\n\n' : '') + trimmed;
    } else {
      if (currentChunk) {
        chunks.push({
          chunkIndex: chunkIdx++,
          content: currentChunk,
          headingPath: [defaultHeading],
          tokenCount: Math.round(currentChunk.length / 4)
        });
      }
      currentChunk = trimmed;
    }
  }

  if (currentChunk) {
    chunks.push({
      chunkIndex: chunkIdx++,
      content: currentChunk,
      headingPath: [defaultHeading],
      tokenCount: Math.round(currentChunk.length / 4)
    });
  }

  return chunks;
}

export function mapReferenceToTopics(
  documentId: string,
  docTitle: string,
  availableTopics: Array<{ id: string; name: string; subjectId: string }>
): KnowledgeLinkResult[] {
  const links: KnowledgeLinkResult[] = [];
  const titleLower = docTitle.toLowerCase();

  for (const topic of availableTopics) {
    const topicNameLower = topic.name.toLowerCase();
    if (titleLower.includes(topicNameLower)) {
      links.push({
        documentId,
        topicId: topic.id,
        confidence: 'high',
        method: 'filename_heuristic'
      });
    }
  }
  return links;
}
