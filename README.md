# Project Demo Page: Streaming E2E ITN (Read–Tag–Write)

Static project page for the Interspeech 2026 paper *"Towards Efficient Simultaneous
Inverse Text Normalization with Pretrained Text-to-Text Language Models and a
Read–Tag–Write Policy."* Styled after the
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template)
(Nerfies-style), e.g. <https://m-arriola.com/bd3lms/>.

## Structure
```
docs/
├── index.html              # the page
└── static/
    ├── css/index.css       # custom styles
    ├── js/demo.js          # interactive Read–Tag–Write streaming demo
    └── images/             # figures (model, latency, ablation)
```

## Interactive demo
`static/js/demo.js` animates the Read–Tag–Write policy on precomputed examples
(token-level B/I/O tags + span outputs), so it runs entirely client-side, with no
backend required. To showcase real model inference, replace the `EXAMPLES` data
(or wire the Run handler to an API endpoint) in `demo.js`.

## Preview locally
```bash
python3 -m http.server 8000 --directory docs
# open http://localhost:8000
```

## Deploy with GitHub Pages
1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*,
   Branch = `main`, Folder = `/docs`.
3. The site publishes at `https://<user>.github.io/<repo>/`.

## TODO before publishing
Replace the `href="#"` placeholders in `index.html` (the header link buttons):
`Paper`, `arXiv`, `Code`, `Dataset`, `HuggingFace`.
