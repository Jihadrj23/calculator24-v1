<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep dedicated calculator educational content in a browser-safe shared guide data module rendered by ToolPage, so every calculator has consistent guidance without duplicating its layout.
- Keep homepage editorial content separate from calculator logic, and constrain tools independently of the wider reading layout so content expansion cannot change calculator behavior.
- Keep additional calculators in a browser-safe calculation module, a declarative field configuration, and a shared form renderer; this isolates new tools from legacy calculator implementations and enables focused formula tests.
- Keep additional calculator guides in a separate browser-safe data module merged into the existing guide registry; this preserves existing editorial content and its shared layout.
- Derive favicon and app icon raster sizes from the rendered header mark at high pixel density; this keeps browser branding identical without introducing a second logo design.
- Keep the header aligned to the main reading container and constrain calculator breadcrumbs, titles, and cards to the same independent tool width; this preserves alignment without narrowing educational content.
- Keep age and date differences in one browser-safe UTC calendar module with month-end-clamped anniversaries; this prevents negative residual days and keeps both tools consistent.
