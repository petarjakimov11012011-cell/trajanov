// Temporary placeholder home. The real Home (hero + featured row + footer) is
// built in the first UI phase; this exists only so the design system — the
// wordmark in Bebas Neue on the matte background, the Label-caps type role — is
// renderable and previewable now. No product content is invented here.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="type-display-xl">TRAJANOV</h1>
      <p className="type-label text-muted-foreground">Site in progress</p>
    </main>
  );
}
