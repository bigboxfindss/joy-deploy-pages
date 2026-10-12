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


## Application rules
- Keep all editable deals in the exported array in src/lib/deals.ts; shared pure filtering and pricing helpers make card calculations consistent and testable.
- Compose this single-page landing experience in the index route with in-page anchors; store and category selection are intersecting filters with explicit reset for empty results.
- Signup is a client-only demonstration and must not persist addresses or report delivery until a real mailing integration is added.
- Define palette and shadows in src/styles.css and reuse the shared Button component for controls to keep presentation consistent.
