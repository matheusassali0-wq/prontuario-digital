export function assertOnlineOrQueueAttachment(meta: Record<string, unknown>) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const key = 'upload-meta-queue';
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push({ ...meta, queuedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(arr));
    const e = new Error('OFFLINE_ATTACHMENT_QUEUED');
    // @ts-expect-error
    e.code = 'OFFLINE_ATTACHMENT_QUEUED';
    throw e;
  }
}
export function drainQueuedAttachmentMeta(): Array<Record<string, unknown>> {
  const key = 'upload-meta-queue';
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  localStorage.removeItem(key);
  return Array.isArray(arr) ? arr : [];
}
export function onOnlineFlushMeta(cb: (items: Array<Record<string, unknown>>) => void) {
  if (typeof window === 'undefined') return;
  const handler = () => {
    const items = drainQueuedAttachmentMeta();
    if (items.length) cb(items);
  };
  window.addEventListener('online', handler);
  return () => window.removeEventListener('online', handler);
}
