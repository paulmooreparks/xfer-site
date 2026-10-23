# xfer-site

This repository is the content of [xfer.parkscomputing.com](https://xfer.parkscomputing.com), the home of XferLang: the site's pages, the specification as a book, a page for each diagnostic code, and the site's own applets.

The site runs on the engine that serves parkscomputing.com, from the engine's own image, in desktop mode. That engine lives in the parkscomputing repository and is shared by every site Paul runs on it; nothing here forks it. The container mounts this repository's `site/` folder as the site's own tree, so what is served is what is committed here.

The language itself is specified in [xferlang](https://github.com/paulmooreparks/xferlang), which is the `spec` submodule here, pinned at the tag the site documents (`v1.0.0-draft.1` today). The browser side of the site uses [xfer-js](https://github.com/paulmooreparks/xfer-js), the `xferlang` package on npm, for everything that parses or converts.

The plan for the site is `spec/history/XFER_SITE_DESIGN.md`, and its decisions are recorded in section 9 there. Phase 1 is the roadmap's milestone M3 (`spec/ROADMAP.md`).

## Layout

| Path | Holds |
|---|---|
| `site/` | The site's web root, mounted read-only into the container: `sitenav.xfer`, `content/` (pages, and books as a main page with a folder of chapters), `applets/`, `images/`. The engine's own scripts, styles and PUDL show through from its image. |
| `tools/` | Scripts that build parts of `site/` from the specification, such as the page for each diagnostic code. Their output is committed, so the container needs nothing but `site/`. |
| `spec/` | The specification and conformance suite, as a submodule. |

## Development

Clone with submodules:

```sh
git clone --recurse-submodules https://github.com/paulmooreparks/xfer-site
```

## Licence

MIT.
