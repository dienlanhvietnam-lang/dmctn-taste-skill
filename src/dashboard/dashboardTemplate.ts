/**
 * dashboardTemplate.ts — HTML/CSS/JS cho webview dashboard.
 * Icon slots prepared for next icon mapping phase.
 * Logo: media/dmctn-taste-logo-dashboard.png via webview URI.
 */

export function buildDashboardHtml(
  nonce: string,
  cspSource: string,
  logoUri: string
): string {
  const csp = `default-src 'none'; img-src ${cspSource}; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';`;
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Security-Policy" content="${csp}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>DMCTN Taste Skill</title>
<style>
  /* Icon slots prepared for next icon mapping phase. */
  :root{
    --dm-bg:#0c0e0b;
    --dm-panel:#141812;
    --dm-panel-soft:#1a2016;
    --dm-border:#2a3524;
    --dm-text:#ebe8df;
    --dm-muted:#96a08c;
    --dm-green:#4f7a37;
    --dm-green-soft:rgba(79,122,55,.2);
    --dm-red:#8c2f2a;
    --dm-red-soft:rgba(140,47,42,.22);
    --dm-gold:#c9a227;
    --dm-gold-soft:rgba(201,162,39,.14);
    --dm-focus:#c9a227;
    --dm-charcoal:#0a0c09;
    --dm-offwhite:#f4f1e8;
    --dm-accent:linear-gradient(90deg,var(--dm-green) 0%,var(--dm-gold) 55%,var(--dm-red) 100%);
    --sp-1:4px;--sp-2:8px;--sp-3:12px;--sp-4:16px;--sp-5:20px;--sp-6:24px;--sp-7:32px;
    --r-sm:6px;--r-md:10px;--r-lg:14px;
    --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    --mono:ui-monospace,Consolas,"Courier New",monospace;
  }
  *{box-sizing:border-box;}
  body{margin:0;font-family:var(--font);background:var(--dm-bg);color:var(--dm-text);
    font-size:14px;line-height:1.55;-webkit-font-smoothing:antialiased;}
  .app{display:flex;min-height:100vh;background:var(--dm-bg);}
  .side{width:196px;flex:0 0 196px;background:var(--dm-panel);border-right:1px solid var(--dm-border);
    padding:var(--sp-4) var(--sp-3);display:flex;flex-direction:column;gap:var(--sp-1);}
  .brand{padding:var(--sp-2) var(--sp-3) var(--sp-4);border-bottom:1px solid var(--dm-border);margin-bottom:var(--sp-2);}
  .brand-title{font-weight:700;font-size:14px;letter-spacing:.01em;color:var(--dm-offwhite);}
  .brand-sub{font-size:11px;color:var(--dm-muted);margin-top:var(--sp-2);line-height:1.4;}
  .navbtn{display:flex;align-items:center;gap:var(--sp-3);width:100%;text-align:left;
    background:transparent;border:1px solid transparent;color:var(--dm-muted);
    padding:var(--sp-2) var(--sp-3);border-radius:var(--r-sm);cursor:pointer;font-size:13px;}
  .navbtn:hover{background:var(--dm-panel-soft);color:var(--dm-text);border-color:var(--dm-border);}
  .navbtn:focus-visible{outline:2px solid var(--dm-focus);outline-offset:2px;}
  .navbtn.active{background:var(--dm-green-soft);color:var(--dm-offwhite);
    border-color:rgba(79,122,55,.4);border-left:3px solid var(--dm-gold);padding-left:calc(var(--sp-3) - 2px);}
  .navbtn.active .dm-icon{opacity:1;border-color:rgba(201,162,39,.35);}
  .nav-label{flex:1;}
  .dm-icon{width:18px;height:18px;flex-shrink:0;border-radius:var(--r-sm);opacity:.75;
    background:var(--dm-panel-soft);border:1px solid var(--dm-border);position:relative;}
  .dm-icon--overview::after{content:"";position:absolute;inset:4px;border:2px solid var(--dm-green);border-radius:2px;}
  .dm-icon--install::after{content:"+";position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;font-size:12px;font-weight:700;color:var(--dm-gold);}
  .dm-icon--skills::after{content:"";position:absolute;left:4px;right:4px;top:5px;height:2px;
    background:var(--dm-green);box-shadow:0 4px 0 var(--dm-green),0 8px 0 var(--dm-muted);}
  .dm-icon--prompt::after{content:"";position:absolute;inset:5px 4px;border-left:2px solid var(--dm-gold);}
  .dm-icon--guide::after{content:"?";position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;font-size:11px;font-weight:700;color:var(--dm-muted);}
  .dm-icon--settings::after{content:"";position:absolute;inset:5px;border:2px solid var(--dm-muted);border-radius:50%;}
  .dm-icon--about::after{content:"i";position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;font-size:11px;font-weight:700;color:var(--dm-green);}
  .side-foot{margin-top:auto;padding-top:var(--sp-3);}
  .badge{font-size:11px;padding:var(--sp-2) var(--sp-3);border-radius:var(--r-sm);
    text-align:center;font-weight:600;line-height:1.35;}
  .badge.ok{background:var(--dm-green-soft);color:#9ccb78;border:1px solid rgba(79,122,55,.35);}
  .badge.no{background:var(--dm-red-soft);color:#e09a96;border:1px solid rgba(140,47,42,.35);}
  .badge.part{background:var(--dm-gold-soft);color:#e2c766;border:1px solid rgba(201,162,39,.35);}
  .main{flex:1;padding:var(--sp-6) var(--sp-7);overflow:auto;position:relative;
    background:linear-gradient(180deg,rgba(79,122,55,.04) 0%,transparent 120px);}
  .main::before{content:"";position:absolute;top:0;left:0;right:0;height:2px;background:var(--dm-accent);opacity:.85;}
  .page{display:none;max-width:860px;}
  .page.active{display:block;animation:fadeIn .2s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
  .page-h1{font-size:22px;font-weight:700;margin:0 0 var(--sp-2);color:var(--dm-offwhite);}
  .page-lead{color:var(--dm-muted);margin:0 0 var(--sp-5);font-size:14px;max-width:52em;}
  .page-h2{font-size:11px;font-weight:600;margin:var(--sp-5) 0 var(--sp-3);
    text-transform:uppercase;letter-spacing:.06em;color:var(--dm-muted);}
  .card{background:var(--dm-panel);border:1px solid var(--dm-border);border-radius:var(--r-md);
    padding:var(--sp-5);margin:var(--sp-4) 0;}
  .card-soft{background:var(--dm-panel-soft);}
  .hero{border-left:3px solid var(--dm-gold);padding:var(--sp-4);background:var(--dm-panel-soft);}
  .hero-inner{display:flex;gap:var(--sp-4);align-items:flex-start;}
  .brand-logo{width:72px;height:72px;object-fit:contain;flex-shrink:0;border-radius:var(--r-sm);
    background:transparent;}
  .brand-logo--sm{width:48px;height:48px;}
  .hero-text{flex:1;min-width:0;}
  .hero h1{font-size:20px;margin:0 0 var(--sp-2);color:var(--dm-offwhite);}
  .hero p{margin:0;color:var(--dm-muted);font-size:13px;line-height:1.5;}
  .pack-badge{display:inline-block;font-size:10px;font-weight:700;text-transform:uppercase;
    letter-spacing:.05em;padding:2px 8px;border-radius:999px;background:var(--dm-gold-soft);
    color:var(--dm-gold);border:1px solid rgba(201,162,39,.35);margin-bottom:var(--sp-2);}
  .pack-card.featured .pack-badge{margin-bottom:var(--sp-1);}
  .about-head{display:flex;gap:var(--sp-4);align-items:center;margin-bottom:var(--sp-4);}
  .guide-card .card-icon{margin-bottom:var(--sp-2);}
  .status-banner{display:flex;flex-wrap:wrap;align-items:center;gap:var(--sp-4);
    padding:var(--sp-4);background:var(--dm-panel-soft);border-radius:var(--r-md);
    border:1px solid var(--dm-border);margin-bottom:var(--sp-4);}
  .status-banner .st{font-size:13px;font-weight:600;padding:var(--sp-2) var(--sp-3);
    border-radius:999px;}
  .st.included{background:var(--dm-green-soft);color:#9ccb78;}
  .st.missing{background:var(--dm-red-soft);color:#e09a96;}
  .st.modified{background:var(--dm-gold-soft);color:#e2c766;}
  .progress-wrap{flex:1;min-width:140px;}
  .progress-label{font-size:11px;color:var(--dm-muted);margin-bottom:var(--sp-1);}
  .progress-track{height:6px;background:var(--dm-charcoal);border-radius:999px;overflow:hidden;border:1px solid var(--dm-border);}
  .progress-fill{height:100%;background:var(--dm-green);border-radius:999px;transition:width .25s;width:0;}
  .row{display:flex;gap:var(--sp-3);flex-wrap:wrap;align-items:center;margin-top:var(--sp-3);}
  .btn{font-family:var(--font);font-size:13px;font-weight:600;border-radius:var(--r-sm);
    padding:var(--sp-2) var(--sp-4);cursor:pointer;border:1px solid transparent;transition:background .15s,border-color .15s;}
  .btn:focus-visible{outline:2px solid var(--dm-focus);outline-offset:2px;}
  .btn-primary{background:var(--dm-green);color:#fff;border-color:var(--dm-green);}
  .btn-primary:hover{filter:brightness(1.08);}
  #btnCopy.btn-primary{background:var(--dm-gold);border-color:var(--dm-gold);color:var(--dm-charcoal);}
  .btn-secondary{background:transparent;color:var(--dm-text);border-color:var(--dm-border);}
  .btn-secondary:hover{background:var(--dm-panel-soft);}
  .btn-danger{background:var(--dm-red);color:#fff;border-color:var(--dm-red);}
  .btn-danger:hover{filter:brightness(1.1);}
  .pack-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--sp-3);}
  .pack-card{background:var(--dm-panel-soft);border:1px solid var(--dm-border);border-radius:var(--r-md);
    padding:var(--sp-4);display:flex;flex-direction:column;gap:var(--sp-2);}
  .pack-card b{font-size:14px;color:var(--dm-offwhite);}
  .pack-card .micro{font-size:12px;color:var(--dm-muted);flex:1;line-height:1.45;}
  .pack-card .btn{width:100%;margin-top:var(--sp-2);}
  .pack-card.featured{border-color:rgba(79,122,55,.5);box-shadow:inset 0 0 0 1px rgba(79,122,55,.15);}
  .callout-gold{font-size:12px;color:var(--dm-gold);padding:var(--sp-3) var(--sp-4);
    background:var(--dm-gold-soft);border-radius:var(--r-sm);border:1px solid rgba(201,162,39,.25);margin:var(--sp-4) 0;}
  ul.files{list-style:none;padding:0;margin:var(--sp-2) 0;}
  ul.files li{font-family:var(--mono);font-size:12px;color:var(--dm-text);
    padding:var(--sp-2) var(--sp-3);background:var(--dm-charcoal);border:1px solid var(--dm-border);
    border-radius:var(--r-sm);margin:var(--sp-1) 0;}
  .field{margin-bottom:var(--sp-4);}
  .field label{display:block;font-size:12px;font-weight:500;color:var(--dm-muted);margin-bottom:var(--sp-2);}
  select,input[type=text],input[type=search]{width:100%;background:var(--dm-panel-soft);
    border:1px solid var(--dm-border);color:var(--dm-text);padding:var(--sp-2) var(--sp-3);
    border-radius:var(--r-sm);font-size:13px;font-family:var(--font);}
  select:focus,input:focus{outline:2px solid var(--dm-focus);outline-offset:0;border-color:var(--dm-gold);}
  .check-row{display:flex;align-items:center;gap:var(--sp-3);margin:var(--sp-3) 0;}
  .check-row input{width:auto;accent-color:var(--dm-green);}
  .check-row label{margin:0;font-size:13px;color:var(--dm-text);}
  .skill-group{margin:var(--sp-4) 0 var(--sp-2);}
  .skill-group-title{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;
    color:var(--dm-muted);margin:var(--sp-4) 0 var(--sp-2);padding-bottom:var(--sp-2);
    border-bottom:1px solid var(--dm-border);}
  .skill-row{display:grid;grid-template-columns:auto 1fr auto;gap:var(--sp-3);align-items:start;
    padding:var(--sp-3) 0;border-bottom:1px solid var(--dm-border);}
  .skill-row:last-child{border-bottom:none;}
  .skill-row input{margin-top:4px;accent-color:var(--dm-green);}
  .skill-row .name{font-size:13px;font-weight:600;}
  .skill-row .desc{font-size:12px;color:var(--dm-muted);margin:var(--sp-1) 0 0;}
  .tag{font-size:10px;padding:2px 6px;border-radius:999px;margin-left:var(--sp-2);vertical-align:middle;
    background:var(--dm-gold-soft);color:var(--dm-gold);}
  .prompt-layout{display:grid;grid-template-columns:1fr;gap:var(--sp-4);}
  @media(min-width:720px){.prompt-layout{grid-template-columns:280px 1fr;align-items:start;}}
  .prompt-out-wrap{margin-top:var(--sp-2);}
  textarea.prompt-out{width:100%;min-height:340px;background:var(--dm-charcoal);
    border:1px solid var(--dm-border);color:var(--dm-text);padding:var(--sp-4);
    border-radius:var(--r-md);font-family:var(--mono);font-size:12.5px;line-height:1.55;resize:vertical;}
  .paste-hint{font-size:12px;color:var(--dm-gold);margin-top:var(--sp-2);}
  .guide-grid{display:grid;gap:var(--sp-3);}
  @media(min-width:640px){.guide-grid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr));}}
  .guide-card{background:var(--dm-panel-soft);border:1px solid var(--dm-border);border-radius:var(--r-md);padding:var(--sp-4);}
  .guide-card h3{font-size:14px;margin:0 0 var(--sp-2);color:var(--dm-offwhite);}
  .guide-card p{font-size:12px;color:var(--dm-muted);margin:0 0 var(--sp-3);}
  pre.snip{margin:0;padding:var(--sp-3);background:var(--dm-charcoal);border:1px solid var(--dm-border);
    border-radius:var(--r-sm);font-family:var(--mono);font-size:11px;color:var(--dm-text);overflow:auto;white-space:pre-wrap;}
  .privacy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:var(--sp-3);margin:var(--sp-4) 0;}
  .privacy-item{background:var(--dm-panel-soft);border:1px solid var(--dm-border);border-radius:var(--r-sm);
    padding:var(--sp-3);font-size:12px;}
  .privacy-item b{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.04em;
    color:var(--dm-gold);margin-bottom:var(--sp-1);}
  .meta-line{font-size:13px;color:var(--dm-muted);margin:var(--sp-2) 0;}
  .meta-line strong{color:var(--dm-text);}
  .empty{padding:var(--sp-5);text-align:center;color:var(--dm-muted);font-size:13px;
    border:1px dashed var(--dm-border);border-radius:var(--r-md);}
  .toast{position:fixed;bottom:var(--sp-5);right:var(--sp-5);background:var(--dm-green);color:#fff;
    padding:var(--sp-3) var(--sp-4);border-radius:var(--r-sm);opacity:0;transform:translateY(8px);
    transition:.22s;pointer-events:none;font-size:13px;max-width:min(420px,90vw);box-shadow:0 8px 24px rgba(0,0,0,.35);z-index:99;}
  .toast.show{opacity:1;transform:translateY(0);}
  @media(max-width:720px){
    .app{flex-direction:column;}
    .side{width:100%;flex:none;flex-direction:row;flex-wrap:wrap;align-items:center;}
    .side-foot{width:100%;}
    .main{padding:var(--sp-4);}
  }
</style>
</head>
<body>
<div class="app">
  <nav class="side" aria-label="Dashboard navigation">
    <div class="brand">
      <div class="brand-title">DMCTN Taste Skill</div>
      <div class="brand-sub" data-i="app.subtitle"></div>
    </div>
    <button class="navbtn active" data-tab="overview" type="button">
      <span class="dm-icon dm-icon--overview" aria-hidden="true"></span>
      <span class="nav-label" data-i="nav.overview"></span>
    </button>
    <button class="navbtn" data-tab="install" type="button">
      <span class="dm-icon dm-icon--install" aria-hidden="true"></span>
      <span class="nav-label" data-i="nav.install"></span>
    </button>
    <button class="navbtn" data-tab="skills" type="button">
      <span class="dm-icon dm-icon--skills" aria-hidden="true"></span>
      <span class="nav-label" data-i="nav.skills"></span>
    </button>
    <button class="navbtn" data-tab="prompts" type="button">
      <span class="dm-icon dm-icon--prompt" aria-hidden="true"></span>
      <span class="nav-label" data-i="nav.prompts"></span>
    </button>
    <button class="navbtn" data-tab="guide" type="button">
      <span class="dm-icon dm-icon--guide" aria-hidden="true"></span>
      <span class="nav-label" data-i="nav.guide"></span>
    </button>
    <button class="navbtn" data-tab="settings" type="button">
      <span class="dm-icon dm-icon--settings" aria-hidden="true"></span>
      <span class="nav-label" data-i="nav.settings"></span>
    </button>
    <button class="navbtn" data-tab="about" type="button">
      <span class="dm-icon dm-icon--about" aria-hidden="true"></span>
      <span class="nav-label" data-i="nav.about"></span>
    </button>
    <div class="side-foot">
      <div id="badge" class="badge no" role="status"></div>
    </div>
  </nav>

  <main class="main">
    <section class="page active" id="overview">
      <div class="card hero">
        <div class="hero-inner">
          <img class="brand-logo" src="${logoUri}" alt="" width="72" height="72" />
          <div class="hero-text">
            <h1 data-i="overview.heroTitle"></h1>
            <p data-i="overview.intro"></p>
          </div>
        </div>
      </div>
      <div class="status-banner">
        <div id="ovStatus" class="st missing" role="status"></div>
        <div class="progress-wrap">
          <div class="progress-label" id="progLabel" data-i="overview.skillProgress"></div>
          <div class="progress-track"><div class="progress-fill" id="progFill"></div></div>
        </div>
      </div>
      <div id="ovEmpty" class="empty" style="display:none" data-i="empty.noWorkspace"></div>
      <div class="row" id="ovActions">
        <button class="btn btn-primary" id="ovFull" type="button" data-i="overview.installFull"></button>
        <button class="btn btn-secondary" id="ovMin" type="button" data-i="overview.installMinimal"></button>
        <button class="btn btn-secondary" data-goto="prompts" type="button" data-i="overview.openPrompt"></button>
        <button class="btn btn-secondary" id="ovCheck" type="button" data-i="overview.checkBtn"></button>
      </div>
    </section>

    <section class="page" id="install">
      <h2 class="page-h1" data-i="install.heading"></h2>
      <p class="page-lead" data-i="install.desc"></p>
      <div class="pack-grid">
        <div class="pack-card">
          <b data-i="install.modeMinimal"></b>
          <span class="micro" data-i="install.modeMinimal.desc"></span>
          <button class="btn btn-secondary" id="instMin" type="button" data-i="install.btnMinimal"></button>
        </div>
        <div class="pack-card featured">
          <span class="pack-badge" data-i="install.recommended"></span>
          <b data-i="install.modeFull"></b>
          <span class="micro" data-i="install.modeFull.desc"></span>
          <button class="btn btn-primary" id="instFull" type="button" data-i="install.btnFull"></button>
        </div>
        <div class="pack-card">
          <b data-i="install.modeCustom"></b>
          <span class="micro" data-i="install.modeCustom.desc"></span>
          <button class="btn btn-secondary" data-goto="skills" id="instCustom" type="button" data-i="install.btnCustom"></button>
        </div>
      </div>
      <p class="callout-gold" data-i="install.overwriteWarn"></p>
      <div class="card">
        <div class="page-h2" style="margin-top:0" data-i="install.planFor"></div>
        <ul class="files" id="planList"></ul>
        <div class="row">
          <button class="btn btn-secondary" id="btnUpdate" type="button" data-i="install.btnUpdate"></button>
        </div>
      </div>
    </section>

    <section class="page" id="skills">
      <h2 class="page-h1" data-i="skills.heading"></h2>
      <p class="page-lead" data-i="skills.intro"></p>
      <div class="card">
        <div class="field" style="margin-top:0">
          <label data-i="skills.filter"></label>
          <input type="search" id="skillFilter" autocomplete="off" data-i-placeholder="skills.filterPlaceholder" />
        </div>
        <div class="check-row">
          <input type="checkbox" id="selAll" />
          <label for="selAll" data-i="skills.selectAll"></label>
        </div>
        <div id="skillList"></div>
        <div class="row">
          <button class="btn btn-primary" id="btnInstallSel" type="button" data-i="skills.installSelected"></button>
        </div>
      </div>
    </section>

    <section class="page" id="prompts">
      <h2 class="page-h1" data-i="prompts.heading"></h2>
      <p class="page-lead" data-i="prompts.tabHint"></p>
      <div class="prompt-layout">
        <div class="card card-soft">
          <div class="field">
            <label data-i="prompts.choosePreset"></label>
            <select id="presetSel"></select>
          </div>
          <div class="field">
            <label data-i="prompts.projectName"></label>
            <input type="text" id="projName" placeholder="MyApp" />
          </div>
          <div class="row">
            <button class="btn btn-primary" id="btnGen" type="button" data-i="prompts.generate"></button>
            <button class="btn btn-primary" id="btnCopy" type="button" data-i="prompts.copy"></button>
          </div>
        </div>
        <div class="prompt-out-wrap">
          <label data-i="prompts.output"></label>
          <textarea id="promptOut" class="prompt-out" readonly placeholder="…"></textarea>
          <p class="paste-hint" data-i="prompts.pasteHint"></p>
        </div>
      </div>
    </section>

    <section class="page" id="guide">
      <h2 class="page-h1" data-i="guide.heading"></h2>
      <div class="guide-grid">
        <div class="guide-card">
          <span class="dm-icon dm-icon--prompt card-icon" aria-hidden="true"></span>
          <h3 data-i="guide.cursor.title"></h3>
          <p data-i="guide.cursor.body"></p>
          <pre class="snip" data-i="guide.cursor.code"></pre>
        </div>
        <div class="guide-card">
          <span class="dm-icon dm-icon--skills card-icon" aria-hidden="true"></span>
          <h3 data-i="guide.vscode.title"></h3>
          <p data-i="guide.vscode.body"></p>
          <pre class="snip" data-i="guide.vscode.code"></pre>
        </div>
        <div class="guide-card">
          <span class="dm-icon dm-icon--install card-icon" aria-hidden="true"></span>
          <h3 data-i="guide.claude.title"></h3>
          <p data-i="guide.claude.body"></p>
          <pre class="snip" data-i="guide.claude.code"></pre>
        </div>
      </div>
    </section>

    <section class="page" id="settings">
      <h2 class="page-h1" data-i="settings.heading"></h2>
      <div class="card">
        <div class="field">
          <label data-i="settings.language"></label>
          <select id="langSel">
            <option value="auto" data-i="settings.language.auto"></option>
            <option value="vi" data-i="settings.language.vi"></option>
            <option value="en" data-i="settings.language.en"></option>
          </select>
        </div>
        <div class="field">
          <label data-i="settings.defaultPack"></label>
          <select id="packSel">
            <option value="minimal" data-i="settings.pack.minimal"></option>
            <option value="full" data-i="settings.pack.full"></option>
          </select>
        </div>
        <div class="check-row">
          <input type="checkbox" id="backup" />
          <label for="backup" data-i="settings.backup"></label>
        </div>
        <div class="check-row">
          <input type="checkbox" id="neverAsk" />
          <label for="neverAsk" data-i="settings.neverAsk"></label>
        </div>
        <div class="row">
          <button class="btn btn-primary" id="btnSave" type="button" data-i="settings.save"></button>
        </div>
      </div>
    </section>

    <section class="page" id="about">
      <div class="about-head">
        <img class="brand-logo brand-logo--sm" src="${logoUri}" alt="" width="48" height="48" />
        <div>
          <h2 class="page-h1" style="margin:0" data-i="about.heading"></h2>
          <p class="page-lead" style="margin:var(--sp-2) 0 0" data-i="about.body"></p>
        </div>
      </div>
      <div class="page-h2" data-i="about.privacy.title"></div>
      <div class="privacy-grid">
        <div class="privacy-item"><b data-i="about.privacy.localLabel"></b><span data-i="about.privacy.local"></span></div>
        <div class="privacy-item"><b data-i="about.privacy.telemetryLabel"></b><span data-i="about.privacy.noTelemetry"></span></div>
        <div class="privacy-item"><b data-i="about.privacy.secretsLabel"></b><span data-i="about.privacy.noSecrets"></span></div>
        <div class="privacy-item"><b data-i="about.privacy.writeLabel"></b><span data-i="about.privacy.askWrite"></span></div>
      </div>
      <div class="card">
        <p class="meta-line"><span data-i="about.version"></span>: <strong id="ver"></strong></p>
        <p class="meta-line"><span data-i="about.author"></span>: <strong id="auth">DMCTN Studio</strong></p>
        <p class="meta-line"><span data-i="about.license"></span>: <strong id="lic">MIT</strong></p>
        <p class="meta-line" data-i="about.credits"></p>
        <div class="row">
          <button class="btn btn-danger" id="btnRemove" type="button" data-i="about.removeBtn"></button>
        </div>
      </div>
    </section>
  </main>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>

<script nonce="${nonce}">
  const vscode = acquireVsCodeApi();
  let MSG = {};
  let SKILLS = [];
  let CORE = [];

  const SKILL_GROUPS = [
    { key: 'core', ids: ['taste-skill','redesign-skill','brandkit','taste-skill-v1'] },
    { key: 'output', ids: ['gpt-tasteskill','output-skill','soft-skill'] },
    { key: 'visual', ids: ['minimalist-skill','brutalist-skill','stitch-skill'] },
    { key: 'image', ids: ['image-to-code-skill','imagegen-frontend-web','imagegen-frontend-mobile'] }
  ];

  function $(s){return document.querySelector(s);}
  function $all(s){return Array.from(document.querySelectorAll(s));}

  function applyI18n(){
    $all('[data-i]').forEach(el=>{
      const k = el.getAttribute('data-i');
      if (MSG[k] !== undefined) el.textContent = MSG[k];
    });
    const ph = $('#skillFilter');
    if (ph && MSG['skills.filterPlaceholder']) ph.placeholder = MSG['skills.filterPlaceholder'];
  }

  function requestPrompt(){
    const preset = $('#presetSel').value || (window.PRESETS && window.PRESETS[0]);
    if(!preset) return;
    vscode.postMessage({type:'generatePrompt', preset, projectName:$('#projName').value});
  }
  let promptDebounce;
  function requestPromptDebounced(){
    clearTimeout(promptDebounce);
    promptDebounce = setTimeout(requestPrompt, 280);
  }

  function showTab(tab){
    $all('.navbtn').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
    $all('.page').forEach(p=>p.classList.toggle('active', p.id===tab));
    if(tab==='prompts') requestPrompt();
  }
  $all('.navbtn').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));
  $all('[data-goto]').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.goto)));

  function selectedSkillIds(){
    return $all('.skchk:checked').map(c=>c.value);
  }
  function planFromSkills(ids){
    return CORE.concat(ids.map(id=>'skills/'+id+'/SKILL.md'));
  }
  function renderPlan(){
    const checked = selectedSkillIds();
    const ids = checked.length ? checked : SKILLS.filter(s=>s.minimal).map(s=>s.id);
    const list = $('#planList'); list.innerHTML='';
    planFromSkills(ids).forEach(f=>{ const li=document.createElement('li'); li.textContent=f; list.appendChild(li); });
  }

  function makeSkillRow(s){
    const row=document.createElement('div'); row.className='skill-row';
    row.dataset.search = (s.name+' '+s.desc+' '+s.id).toLowerCase();
    const cb=document.createElement('input'); cb.type='checkbox'; cb.className='skchk'; cb.value=s.id;
    cb.checked = s.minimal;
    cb.addEventListener('change',renderPlan);
    const body=document.createElement('div');
    const name=document.createElement('div'); name.className='name';
    name.textContent=s.name;
    if(s.minimal){ const tag=document.createElement('span'); tag.className='tag'; tag.textContent=MSG['skills.minimalTag']||'minimal'; name.appendChild(tag); }
    const desc=document.createElement('div'); desc.className='desc'; desc.textContent=s.desc;
    body.appendChild(name); body.appendChild(desc);
    const st=document.createElement('span'); st.className='st '+s.state;
    st.textContent = MSG['skills.state.'+s.state]||s.state;
    row.appendChild(cb); row.appendChild(body); row.appendChild(st);
    return row;
  }

  function renderSkills(){
    const wrap = $('#skillList'); wrap.innerHTML='';
    const byId = Object.fromEntries(SKILLS.map(s=>[s.id,s]));
    const used = new Set();
    SKILL_GROUPS.forEach(g=>{
      const skills = g.ids.map(id=>byId[id]).filter(Boolean);
      if(!skills.length) return;
      skills.forEach(s=>used.add(s.id));
      const title=document.createElement('div'); title.className='skill-group-title';
      title.textContent = MSG['skills.group.'+g.key] || g.key;
      wrap.appendChild(title);
      skills.forEach(s=>wrap.appendChild(makeSkillRow(s)));
    });
    SKILLS.filter(s=>!used.has(s.id)).forEach(s=>{
      wrap.appendChild(makeSkillRow(s));
    });
    renderPlan();
    filterSkills();
  }

  function filterSkills(){
    const q = ($('#skillFilter').value||'').toLowerCase().trim();
    $all('.skill-row').forEach(row=>{
      row.style.display = !q || row.dataset.search.includes(q) ? '' : 'none';
    });
    $all('.skill-group-title').forEach(t=>{
      let el = t.nextElementSibling;
      let any = false;
      while(el && !el.classList.contains('skill-group-title')){
        if(el.classList && el.classList.contains('skill-row') && el.style.display !== 'none') any = true;
        el = el.nextElementSibling;
      }
      t.style.display = any || !q ? '' : 'none';
    });
  }
  $('#skillFilter').addEventListener('input', filterSkills);

  function renderPresets(presets){
    window.PRESETS = presets || [];
    const sel=$('#presetSel'); sel.innerHTML='';
    presets.forEach(p=>{ const o=document.createElement('option'); o.value=p; o.textContent=MSG['presets.'+p]||p; sel.appendChild(o); });
    if(presets.length && !sel.value) sel.value = presets[0];
  }

  function statusLabel(s){
    if(!s.hasWorkspace) return MSG['install.noWorkspace'];
    if(s.status==='installed') return MSG['status.installed'];
    if(s.status==='minimal') return MSG['status.minimal'];
    if(s.status==='partial') return MSG['status.partial'];
    return MSG['status.missing'];
  }
  function statusClass(s){
    if(!s.hasWorkspace) return 'no';
    if(s.status==='installed' || s.status==='minimal') return 'ok';
    if(s.status==='partial') return 'part';
    return 'no';
  }

  function renderState(s){
    MSG=s.messages||{}; SKILLS=s.skills||[]; CORE=s.coreFiles||[];
    applyI18n();
    document.documentElement.lang=s.lang;
    $('#ver').textContent=s.version||'';
    $('#auth').textContent=s.author||'DMCTN Studio';
    $('#lic').textContent=s.license||'MIT';
    $('#langSel').value=s.languageSetting||'auto';
    $('#packSel').value=s.defaultPack||'minimal';
    $('#backup').checked=!!s.backup;
    $('#neverAsk').checked=!!s.neverAsk;

    const badge=$('#badge'); const ov=$('#ovStatus');
    const cls=statusClass(s);
    const label=statusLabel(s);
    badge.className='badge '+cls; badge.textContent=label;
    ov.className='st '+(s.status==='installed'||s.status==='minimal'?'included':(s.status==='partial'?'modified':'missing'));
    ov.textContent=label;

    const total = s.skillsTotal||13;
    const inst = s.skillsInstalled||0;
    const pct = total ? Math.round((inst/total)*100) : 0;
    $('#progFill').style.width = s.hasWorkspace ? pct+'%' : '0%';
    let progText = MSG['overview.skillProgress']||'';
    if(s.hasWorkspace) progText += ' — '+inst+'/'+total;
    $('#progLabel').textContent = progText;

    const empty=$('#ovEmpty'); const actions=$('#ovActions');
    if(!s.hasWorkspace){
      empty.style.display='block';
      actions.style.display='none';
    } else {
      empty.style.display='none';
      actions.style.display='flex';
    }

    renderPresets(s.presets||[]);
    renderSkills();
    if($('#prompts').classList.contains('active')) requestPrompt();
  }

  $('#ovCheck').addEventListener('click',()=>vscode.postMessage({type:'check'}));
  $('#ovMin').addEventListener('click',()=>vscode.postMessage({type:'install', mode:'minimal'}));
  $('#ovFull').addEventListener('click',()=>vscode.postMessage({type:'install', mode:'full'}));
  $('#instMin').addEventListener('click',()=>vscode.postMessage({type:'install', mode:'minimal'}));
  $('#instFull').addEventListener('click',()=>vscode.postMessage({type:'install', mode:'full'}));
  $('#btnUpdate').addEventListener('click',()=>vscode.postMessage({type:'update'}));
  $('#btnRemove').addEventListener('click',()=>vscode.postMessage({type:'remove'}));
  $('#btnInstallSel').addEventListener('click',()=>vscode.postMessage({type:'install', mode:'custom', skills:selectedSkillIds()}));
  $('#selAll').addEventListener('change',e=>{ $all('.skchk').forEach(c=>c.checked=e.target.checked); renderPlan(); });
  $('#presetSel').addEventListener('change', requestPrompt);
  $('#projName').addEventListener('input', requestPromptDebounced);
  $('#btnGen').addEventListener('click', requestPrompt);
  $('#btnCopy').addEventListener('click',()=>vscode.postMessage({type:'copy', text:$('#promptOut').value}));

  let toastTimer;
  function toast(text){ const el=$('#toast'); el.textContent=text; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2800); }

  $('#btnSave').addEventListener('click',()=>vscode.postMessage({type:'saveSettings', language:$('#langSel').value, neverAsk:$('#neverAsk').checked, defaultPack:$('#packSel').value, backup:$('#backup').checked}));

  window.addEventListener('message',e=>{
    const d=e.data;
    if(d.type==='state') renderState(d);
    else if(d.type==='prompt') $('#promptOut').value=d.text;
    else if(d.type==='toast') toast(d.text);
  });

  vscode.postMessage({type:'ready'});
</script>
</body>
</html>`;
}
