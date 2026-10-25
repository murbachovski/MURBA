import { supportUrl } from "@/lib/money";

export function SupportNote({ line, label }: { line: string; label: string }) {
  if (!supportUrl) return null;
  return (
    <p className="mt-16 border-t border-rule pt-6 text-sm text-ink-soft">
      {line}{" "}
      <a href={supportUrl} target="_blank" rel="noopener" className="ink-link text-ink">
        {label} →
      </a>
    </p>
  );
}
