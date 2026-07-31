# Component-level customization

Use this path when a project needs different structure or behavior. Keep content in the config
files and change the component that owns the relevant responsibility.

## Shell component map

| Component          | Responsibility                                                             |
| ------------------ | -------------------------------------------------------------------------- |
| `SiteShell`        | Skip link, announcement, header, main landmark, and footer composition     |
| `SiteHeader`       | Desktop navigation, primary action, theme control, and mobile entry point  |
| `MobileNavigation` | Expanded state, accessible labels, Escape handling, and compact navigation |
| `Announcement`     | Optional site-wide message and action                                      |
| `SiteFooter`       | Link groups, social links, legal links, and project identity               |
| `Section`          | Consistent section landmark, heading association, and spacing              |
| `SiteLink`         | Route, anchor, and external-link behavior                                  |
| `Brand`            | Type-safe home link and replaceable visual mark                            |

All shell components live under `src/components/site/`. shadcn/ui primitives remain under
`src/components/ui/`; add new primitives with `vpr ui add <component>` instead of hand-copying
registry code.

## Preserve accessibility contracts

When redesigning the shell, keep these behaviors:

- the first keyboard-focusable element is the “Skip to content” link;
- the main landmark keeps `id="main-content"` and can receive focus;
- navigation regions have distinct accessible labels;
- the mobile trigger exposes `aria-expanded`, `aria-controls`, and an action-specific label;
- Escape closes the mobile menu;
- visible focus indication is not removed;
- section navigation targets keep adequate scroll margin;
- motion has a `prefers-reduced-motion` fallback.

Use real links for navigation. Internal application routes should use TanStack Router `Link`;
buttons are for actions that do not navigate.

## Add a route

1. Add the file route below `src/routes/`.
2. Extend the route-link schema in `src/config/site.ts` with the new literal path.
3. Add the link to navigation or a footer group.
4. Add the route to `seo.sitemap` when it should be indexed.
5. Run `vpr check`, `vpr test run`, and `vpr build`.

Keeping the route schema explicit means a misspelled configured path fails type checking instead
of becoming a broken production link.

## Work with visual presets

Do not put brand colors directly into section components. Use the semantic variables in
`src/styles.css` (`--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, and
`--border`). Typography, density, geometry, color, and composition are defined together in
`src/config/presets.ts`, so a component can respond to every preset without branching on a preset
name.

Use existing semantic variables before adding a new one. When a component needs a genuinely new
visual role, add the token to the preset schema, provide a value in every preset, and consume it in
`src/styles.css`. See [Visual presets](visual-presets.md) for the full contract and screenshot
workflow.
