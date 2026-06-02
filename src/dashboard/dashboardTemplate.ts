/**
 * dashboardTemplate.ts — Premium Vietnamese developer console (webview).
 * Icon slots prepared for next icon mapping phase.
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
    --dm-bg:#080a08;
    --dm-bg-elevated:#0e110d;
    --dm-panel:#131712;
    --dm-panel-2:#181f15;
    --dm-border-soft:rgba(154,160,140,.12);
    --dm-border-strong:rgba(154,160,140,.22);
    --dm-text:#ece9e0;
    --dm-text-soft:#a8b09a;
    --dm-green:#527a3d;
    --dm-green-soft:rgba(82,122,61,.22);
    --dm-green-glow:rgba(82,122,61,.08);
    --dm-red:#7a322e;
    --dm-red-soft:rgba(122,50,46,.24);
    --dm-gold:#b8941f;
    --dm-gold-soft:rgba(184,148,31,.16);
    --dm-focus:#c9a227;
    --dm-charcoal:#060806;
    --dm-offwhite:#f3f0e6;
    --dm-shadow-soft:0 1px 0 rgba(255,255,255,.04) inset, 0 8px 24px rgba(0,0,0,.28);
    --dm-shadow-card:0 12px 32px rgba(0,0,0,.22);
    --sp-1:4px;--sp-2:8px;--sp-3:12px;--sp-4:16px;--sp-5:20px;--sp-6:24px;--sp-7:32px;
    --r-sm:10px;--r-md:14px;--r-lg:18px;
    --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    --mono:ui-monospace,Consolas,"Courier New",monospace;
  }
  *{box-sizing:border-box;}
  body{margin:0;font-family:var(--font);background:var(--dm-bg);color:var(--dm-text);
    font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased;}
  .app{display:flex;min-height:100vh;background:var(--dm-bg);}
  .side{width:176px;flex:0 0 176px;background:var(--dm-bg-elevated);
    border-right:1px solid var(--dm-border-soft);padding:var(--sp-4) var(--sp-2);
    display:flex;flex-direction:column;gap:2px;}
  .brand{padding:var(--sp-2) var(--sp-3) var(--sp-4);margin-bottom:var(--sp-1);}
  .brand-title{font-weight:650;font-size:13px;letter-spacing:.02em;color:var(--dm-offwhite);}
  .brand-sub{font-size:10px;color:var(--dm-text-soft);margin-top:var(--sp-2);line-height:1.45;}
  .navbtn{display:flex;align-items:center;gap:var(--sp-3);width:100%;text-align:left;
    background:transparent;border:none;color:var(--dm-text-soft);
    padding:7px var(--sp-3);border-radius:var(--r-sm);cursor:pointer;font-size:12.5px;
    border-left:3px solid transparent;transition:background .12s,color .12s;}
  .navbtn:hover{background:rgba(255,255,255,.03);color:var(--dm-text);}
  .navbtn:focus-visible{outline:2px solid var(--dm-focus);outline-offset:1px;}
  .navbtn.active{background:var(--dm-green-glow);color:var(--dm-offwhite);
    border-left-color:var(--dm-gold);}
  .navbtn.active .dm-icon{opacity:1;border-color:rgba(184,148,31,.3);}
  .nav-label{flex:1;line-height:1.3;}
  .dm-icon{width:16px;height:16px;flex-shrink:0;border-radius:6px;opacity:.7;
    background:var(--dm-panel-2);border:1px solid var(--dm-border-soft);position:relative;}
  .dm-icon--overview::after{content:"";position:absolute;inset:3px;border:2px solid var(--dm-green);border-radius:2px;}
  .dm-icon--install::after{content:"+";position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;font-size:11px;font-weight:700;color:var(--dm-gold);}
  .dm-icon--skills::after{content:"";position:absolute;left:3px;right:3px;top:4px;height:2px;
    background:var(--dm-green);box-shadow:0 3px 0 var(--dm-green),0 6px 0 var(--dm-text-soft);}
  .dm-icon--prompt::after{content:"";position:absolute;inset:4px 3px;border-left:2px solid var(--dm-gold);}
  .dm-icon--guide::after{content:"?";position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;font-size:10px;font-weight:700;color:var(--dm-text-soft);}
  .dm-icon--settings::after{content:"";position:absolute;inset:4px;border:2px solid var(--dm-text-soft);border-radius:50%;}
  .dm-icon--about::after{content:"i";position:absolute;inset:0;display:flex;align-items:center;
    justify-content:center;font-size:10px;font-weight:700;color:var(--dm-green);}
  .side-foot{margin-top:auto;padding:var(--sp-3) var(--sp-2) 0;}
  .status-chip{font-size:10px;padding:6px 10px;border-radius:var(--r-sm);font-weight:600;
    line-height:1.35;border:1px solid var(--dm-border-soft);background:var(--dm-panel);}
  .status-chip.ok{color:#9ccb78;background:var(--dm-green-soft);border-color:rgba(82,122,61,.35);}
  .status-chip.no{color:#d9a09c;background:var(--dm-red-soft);}
  .status-chip.part{color:#e2c766;background:var(--dm-gold-soft);}
  .main{flex:1;padding:var(--sp-6) var(--sp-7) var(--sp-7);overflow:auto;
    background:radial-gradient(ellipse 80% 50% at 20% -10%,var(--dm-green-glow),transparent 55%),
      var(--dm-bg);}
  .main-inner{max-width:920px;margin:0 auto;}
  .page{display:none;}
  .page.active{display:block;animation:fadeIn .18s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
  .page-head{margin-bottom:var(--sp-5);}
  .page-h1{font-size:21px;font-weight:650;margin:0 0 var(--sp-2);color:var(--dm-offwhite);letter-spacing:-.02em;}
  .page-lead{color:var(--dm-text-soft);margin:0;font-size:13.5px;max-width:42em;line-height:1.55;}
  .section-label{font-size:10px;font-weight:650;text-transform:uppercase;letter-spacing:.08em;
    color:var(--dm-text-soft);margin:0 0 var(--sp-3);}
  .card{background:var(--dm-panel);border:1px solid var(--dm-border-soft);border-radius:var(--r-md);
    box-shadow:var(--dm-shadow-soft);}
  .card-pad{padding:var(--sp-5);}
  .card-inset{background:var(--dm-panel-2);border-color:var(--dm-border-soft);}
  .overview-layout{display:grid;gap:var(--sp-4);}
  @media(min-width:780px){
    .overview-layout{grid-template-columns:1.15fr .85fr;}
    .hero-premium{grid-column:1/-1;}
    .info-strip{grid-column:1/-1;}
  }
  .hero-premium{position:relative;overflow:hidden;padding:var(--sp-5) var(--sp-6);
    border:1px solid var(--dm-border-strong);background:linear-gradient(135deg,var(--dm-panel) 0%,var(--dm-panel-2) 100%);}
  .hero-premium::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;
    background:linear-gradient(90deg,var(--dm-green),var(--dm-gold) 70%,var(--dm-red));}
  .hero-inner{display:flex;gap:var(--sp-5);align-items:center;}
  .brand-logo{width:64px;height:64px;object-fit:contain;flex-shrink:0;
    filter:drop-shadow(0 4px 12px rgba(0,0,0,.35));}
  .brand-logo--sm{width:44px;height:44px;}
  .hero-text{flex:1;min-width:0;}
  .hero-premium h1{font-size:22px;margin:0 0 var(--sp-2);color:var(--dm-offwhite);font-weight:650;}
  .hero-premium p{margin:0;color:var(--dm-text-soft);font-size:13.5px;max-width:36em;}
  .status-panel .status-big{font-size:14px;font-weight:600;padding:var(--sp-3) var(--sp-4);
    border-radius:var(--r-sm);display:inline-block;margin-bottom:var(--sp-4);}
  .st.included{background:var(--dm-green-soft);color:#a8d68a;}
  .st.missing{background:var(--dm-red-soft);color:#e0aaa6;}
  .st.modified{background:var(--dm-gold-soft);color:#e8d078;}
  .progress-block{margin-bottom:var(--sp-4);}
  .progress-label{font-size:11px;color:var(--dm-text-soft);margin-bottom:var(--sp-2);font-weight:500;}
  .progress-track{height:8px;background:var(--dm-charcoal);border-radius:999px;overflow:hidden;
    border:1px solid var(--dm-border-soft);}
  .progress-fill{height:100%;background:linear-gradient(90deg,var(--dm-green),#6a9a52);
    border-radius:999px;transition:width .3s ease;width:0;}
  .info-strip{display:flex;flex-wrap:wrap;gap:var(--sp-2);}
  .pill{font-size:11px;padding:6px 12px;border-radius:999px;background:var(--dm-panel-2);
    border:1px solid var(--dm-border-soft);color:var(--dm-text-soft);white-space:nowrap;}
  .pill strong{color:var(--dm-gold);font-weight:600;margin-right:4px;}
  .action-toolbar{display:flex;flex-wrap:wrap;gap:var(--sp-3);align-items:center;}
  .btn{font-family:var(--font);font-size:13px;font-weight:600;border-radius:var(--r-sm);
    padding:9px 16px;cursor:pointer;border:1px solid transparent;
    transition:filter .12s,background .12s,border-color .12s;}
  .btn:focus-visible{outline:2px solid var(--dm-focus);outline-offset:2px;}
  .btn-lg{padding:11px 20px;font-size:14px;}
  .btn-primary{background:var(--dm-green);color:#fff;border-color:#5f8f47;
    box-shadow:0 1px 0 rgba(255,255,255,.12) inset;}
  .btn-primary:hover{filter:brightness(1.1);}
  .btn-secondary{background:var(--dm-panel-2);color:var(--dm-text);border-color:var(--dm-border-strong);}
  .btn-secondary:hover{background:var(--dm-panel);border-color:var(--dm-gold-soft);}
  .btn-tertiary{background:transparent;color:var(--dm-text-soft);border-color:var(--dm-border-soft);}
  .btn-tertiary:hover{color:var(--dm-text);border-color:var(--dm-border-strong);}
  .btn-ghost{background:transparent;color:var(--dm-text-soft);border-color:transparent;padding-left:12px;padding-right:12px;}
  .btn-ghost:hover{color:var(--dm-text);background:rgba(255,255,255,.04);}
  .btn-copy{background:var(--dm-gold);color:var(--dm-charcoal);border-color:#a08018;font-weight:700;}
  .btn-copy:hover{filter:brightness(1.08);}
  .btn-danger{background:var(--dm-red);color:#fff;border-color:var(--dm-red);}
  .pack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--sp-4);}
  @media(max-width:820px){.pack-grid{grid-template-columns:1fr;}}
  .pack-card{background:var(--dm-panel-2);border:1px solid var(--dm-border-soft);border-radius:var(--r-md);
    padding:var(--sp-5);display:flex;flex-direction:column;gap:var(--sp-2);min-height:168px;}
  .pack-card b{font-size:15px;color:var(--dm-offwhite);}
  .pack-card .micro{font-size:12px;color:var(--dm-text-soft);flex:1;line-height:1.5;}
  .pack-card .btn{width:100%;margin-top:auto;}
  .pack-card.featured{border-color:rgba(82,122,61,.45);background:linear-gradient(180deg,rgba(82,122,61,.1),var(--dm-panel-2));
    box-shadow:var(--dm-shadow-card);}
  .pack-badge{display:inline-block;font-size:9px;font-weight:700;text-transform:uppercase;
    letter-spacing:.06em;padding:3px 8px;border-radius:999px;background:var(--dm-gold-soft);
    color:var(--dm-gold);border:1px solid rgba(184,148,31,.3);width:fit-content;}
  .callout-safe{font-size:12px;color:var(--dm-gold);padding:var(--sp-3) var(--sp-4);
    background:var(--dm-gold-soft);border-radius:var(--r-sm);border:1px solid rgba(184,148,31,.2);
    margin:var(--sp-4) 0;line-height:1.45;}
  .files-panel{margin-top:var(--sp-4);}
  ul.files{list-style:none;padding:0;margin:0;display:grid;gap:var(--sp-2);
    grid-template-columns:repeat(auto-fill,minmax(240px,1fr));}
  ul.files li{font-family:var(--mono);font-size:11.5px;color:var(--dm-text);
    padding:var(--sp-2) var(--sp-3);background:var(--dm-charcoal);border:1px solid var(--dm-border-soft);
    border-radius:var(--r-sm);}
  .field{margin-bottom:var(--sp-4);}
  .field:last-child{margin-bottom:0;}
  .field label{display:block;font-size:11px;font-weight:600;color:var(--dm-text-soft);
    margin-bottom:var(--sp-2);text-transform:uppercase;letter-spacing:.04em;}
  select,input[type=text],input[type=search]{width:100%;background:var(--dm-charcoal);
    border:1px solid var(--dm-border-soft);color:var(--dm-text);padding:10px var(--sp-3);
    border-radius:var(--r-sm);font-size:13px;font-family:var(--font);}
  select:focus,input:focus{outline:none;border-color:var(--dm-gold);box-shadow:0 0 0 2px var(--dm-gold-soft);}
  .search-wrap{position:relative;}
  .check-row{display:flex;align-items:center;gap:var(--sp-3);margin:var(--sp-4) 0 var(--sp-3);
    padding:var(--sp-3);background:var(--dm-panel-2);border-radius:var(--r-sm);border:1px solid var(--dm-border-soft);}
  .check-row input{width:auto;accent-color:var(--dm-green);}
  .check-row label{margin:0;font-size:13px;color:var(--dm-text);}
  .skill-group{margin:var(--sp-4) 0 0;}
  .skill-group-title{font-size:10px;font-weight:650;text-transform:uppercase;letter-spacing:.07em;
    color:var(--dm-gold);margin:0 0 var(--sp-2);padding-bottom:var(--sp-2);
    border-bottom:1px solid var(--dm-border-soft);}
  .skill-row{display:grid;grid-template-columns:auto 1fr auto;gap:var(--sp-3);align-items:start;
    padding:var(--sp-3);margin-bottom:var(--sp-2);border-radius:var(--r-sm);
    border:1px solid transparent;background:transparent;transition:background .1s,border-color .1s;}
  .skill-row:hover{background:rgba(255,255,255,.02);border-color:var(--dm-border-soft);}
  .skill-row input{margin-top:5px;accent-color:var(--dm-green);}
  .skill-row .name{font-size:13px;font-weight:600;color:var(--dm-offwhite);}
  .skill-row .desc{font-size:12px;color:var(--dm-text-soft);margin:var(--sp-1) 0 0;line-height:1.4;}
  .tag{font-size:9px;padding:2px 6px;border-radius:999px;margin-left:var(--sp-2);vertical-align:middle;
    background:var(--dm-gold-soft);color:var(--dm-gold);font-weight:600;}
  .skill-row .st{font-size:10px;font-weight:650;padding:4px 10px;border-radius:999px;white-space:nowrap;}
  .prompt-stage{display:grid;gap:var(--sp-4);}
  @media(min-width:800px){.prompt-stage{grid-template-columns:260px 1fr;align-items:stretch;}}
  .prompt-controls{display:flex;flex-direction:column;gap:0;}
  .prompt-output-card{flex:1;display:flex;flex-direction:column;min-height:400px;
    border:1px solid var(--dm-border-strong);border-radius:var(--r-md);background:var(--dm-panel);
    box-shadow:var(--dm-shadow-card);overflow:hidden;}
  .prompt-output-head{padding:var(--sp-3) var(--sp-4);border-bottom:1px solid var(--dm-border-soft);
    display:flex;align-items:center;justify-content:space-between;gap:var(--sp-3);
    background:var(--dm-panel-2);}
  .prompt-output-head .section-label{margin:0;}
  textarea.prompt-out{flex:1;width:100%;min-height:360px;background:var(--dm-charcoal);
    border:none;color:var(--dm-text);padding:var(--sp-4) var(--sp-5);
    font-family:var(--mono);font-size:12.5px;line-height:1.6;resize:vertical;}
  textarea.prompt-out:focus{outline:none;}
  .paste-hint{font-size:11.5px;color:var(--dm-gold);padding:var(--sp-3) var(--sp-4);
    border-top:1px solid var(--dm-border-soft);background:var(--dm-panel-2);margin:0;}
  .guide-grid{display:grid;gap:var(--sp-4);}
  @media(min-width:700px){.guide-grid{grid-template-columns:repeat(3,1fr);}}
  .guide-card{background:var(--dm-panel-2);border:1px solid var(--dm-border-soft);
    border-radius:var(--r-md);padding:var(--sp-4);display:flex;flex-direction:column;}
  .guide-card h3{font-size:13px;margin:0 0 var(--sp-2);color:var(--dm-offwhite);font-weight:650;}
  .guide-card p{font-size:12px;color:var(--dm-text-soft);margin:0 0 var(--sp-3);flex:1;line-height:1.5;}
  .guide-card .card-icon{margin-bottom:var(--sp-2);}
  pre.snip{margin:0;padding:var(--sp-3);background:var(--dm-charcoal);border:1px solid var(--dm-border-soft);
    border-radius:var(--r-sm);font-family:var(--mono);font-size:10.5px;color:var(--dm-text);line-height:1.45;}
  .settings-card{max-width:480px;}
  .privacy-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--sp-3);margin:var(--sp-4) 0;}
  @media(min-width:600px){.privacy-grid{grid-template-columns:repeat(4,1fr);}}
  .privacy-item{background:var(--dm-panel-2);border:1px solid var(--dm-border-soft);border-radius:var(--r-sm);
    padding:var(--sp-3);font-size:11.5px;line-height:1.45;color:var(--dm-text-soft);}
  .privacy-item b{display:block;font-size:9px;text-transform:uppercase;letter-spacing:.06em;
    color:var(--dm-gold);margin-bottom:var(--sp-2);font-weight:650;}
  .about-head{display:flex;gap:var(--sp-4);align-items:flex-start;margin-bottom:var(--sp-5);}
  .about-meta{max-width:520px;}
  .meta-line{font-size:12.5px;color:var(--dm-text-soft);margin:var(--sp-2) 0;}
  .meta-line strong{color:var(--dm-text);}
  .empty{padding:var(--sp-6);text-align:center;color:var(--dm-text-soft);font-size:13px;
    border:1px dashed var(--dm-border-soft);border-radius:var(--r-md);background:var(--dm-panel-2);}
  .toast{position:fixed;bottom:var(--sp-5);right:var(--sp-5);background:var(--dm-green);color:#fff;
    padding:var(--sp-3) var(--sp-5);border-radius:var(--r-sm);opacity:0;transform:translateY(8px);
    transition:.2s;pointer-events:none;font-size:13px;max-width:min(400px,90vw);
    box-shadow:var(--dm-shadow-card);z-index:99;border:1px solid rgba(255,255,255,.1);}
  .toast.show{opacity:1;transform:translateY(0);}
  .mb-4{margin-bottom:var(--sp-4);}
  @media(max-width:720px){
    .app{flex-direction:column;}
    .side{width:100%;flex:none;flex-direction:row;flex-wrap:wrap;padding:var(--sp-3);}
    .side-foot{width:100%;}
    .main{padding:var(--sp-4);}
    .pack-grid{grid-template-columns:1fr;}
  }
</style>
</head>
<body>
<div class="app">
  <nav class="side" aria-label="Dashboard navigation">
    <div class="brand">
      <div class="brand-title">DMCTN Taste</div>
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
      <div id="badge" class="status-chip no" role="status"></div>
    </div>
  </nav>

  <main class="main">
  <div class="main-inner">
    <section class="page active" id="overview">
      <div class="overview-layout">
        <div class="hero-premium card">
          <div class="hero-inner">
            <img class="brand-logo" src="${logoUri}" alt="" width="64" height="64" />
            <div class="hero-text">
              <h1 data-i="overview.heroTitle"></h1>
              <p data-i="overview.intro"></p>
            </div>
          </div>
        </div>
        <div class="info-strip card card-pad">
          <span class="pill"><strong>●</strong> <span data-i="overview.pillLocal"></span></span>
          <span class="pill"><strong>15</strong> <span data-i="overview.pillSkills"></span></span>
          <span class="pill"><strong>○</strong> <span data-i="overview.pillTelemetry"></span></span>
          <span class="pill"><strong>⇄</strong> <span data-i="overview.pillBilingual"></span></span>
        </div>
        <div class="status-panel card card-pad">
          <p class="section-label" data-i="overview.statusTitle"></p>
          <div id="ovStatus" class="status-big st missing" role="status"></div>
          <div class="progress-block">
            <div class="progress-label" id="progLabel" data-i="overview.skillProgress"></div>
            <div class="progress-track"><div class="progress-fill" id="progFill"></div></div>
          </div>
        </div>
        <div class="actions-panel card card-pad">
          <p class="section-label" data-i="overview.actionsTitle"></p>
          <div id="ovEmpty" class="empty" style="display:none" data-i="empty.noWorkspace"></div>
          <div class="action-toolbar" id="ovActions">
            <button class="btn btn-lg btn-primary" id="ovFull" type="button" data-i="overview.installFull"></button>
            <button class="btn btn-secondary" data-goto="prompts" type="button" data-i="overview.openPrompt"></button>
            <button class="btn btn-tertiary" id="ovMin" type="button" data-i="overview.installMinimal"></button>
            <button class="btn btn-ghost" id="ovCheck" type="button" data-i="overview.checkBtn"></button>
          </div>
        </div>
      </div>
    </section>

    <section class="page" id="install">
      <div class="page-head">
        <h2 class="page-h1" data-i="install.heading"></h2>
        <p class="page-lead" data-i="install.desc"></p>
      </div>
      <div class="pack-grid mb-4">
        <div class="pack-card">
          <b data-i="install.modeMinimal"></b>
          <span class="micro" data-i="install.modeMinimal.desc"></span>
          <button class="btn btn-tertiary" id="instMin" type="button" data-i="install.btnMinimal"></button>
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
      <p class="callout-safe" data-i="install.overwriteWarn"></p>
      <div class="card card-pad files-panel">
        <p class="section-label" data-i="install.planFor"></p>
        <ul class="files" id="planList"></ul>
        <div class="action-toolbar" style="margin-top:var(--sp-4)">
          <button class="btn btn-secondary" id="btnUpdate" type="button" data-i="install.btnUpdate"></button>
        </div>
      </div>
    </section>

    <section class="page" id="skills">
      <div class="page-head">
        <h2 class="page-h1" data-i="skills.heading"></h2>
        <p class="page-lead" data-i="skills.intro"></p>
      </div>
      <div class="card card-pad">
        <div class="field search-wrap">
          <label data-i="skills.filter"></label>
          <input type="search" id="skillFilter" autocomplete="off" data-i-placeholder="skills.filterPlaceholder" />
        </div>
        <div class="check-row">
          <input type="checkbox" id="selAll" />
          <label for="selAll" data-i="skills.selectAll"></label>
        </div>
        <div id="skillList"></div>
        <div class="action-toolbar" style="margin-top:var(--sp-4)">
          <button class="btn btn-primary" id="btnInstallSel" type="button" data-i="skills.installSelected"></button>
        </div>
      </div>
    </section>

    <section class="page" id="prompts">
      <div class="page-head">
        <h2 class="page-h1" data-i="prompts.heading"></h2>
        <p class="page-lead" data-i="prompts.tabHint"></p>
      </div>
      <div class="prompt-stage">
        <div class="card card-pad prompt-controls">
          <div class="field">
            <label data-i="prompts.choosePreset"></label>
            <select id="presetSel"></select>
          </div>
          <div class="field">
            <label data-i="prompts.projectName"></label>
            <input type="text" id="projName" placeholder="MyApp" />
          </div>
          <div class="action-toolbar">
            <button class="btn btn-secondary" id="btnGen" type="button" data-i="prompts.generate"></button>
            <button class="btn btn-copy btn-lg" id="btnCopy" type="button" data-i="prompts.copy"></button>
          </div>
        </div>
        <div class="prompt-output-card">
          <div class="prompt-output-head">
            <p class="section-label" data-i="prompts.outputTitle"></p>
          </div>
          <textarea id="promptOut" class="prompt-out" readonly placeholder="…"></textarea>
          <p class="paste-hint" data-i="prompts.pasteHint"></p>
        </div>
      </div>
    </section>

    <section class="page" id="guide">
      <div class="page-head">
        <h2 class="page-h1" data-i="guide.heading"></h2>
      </div>
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
      <div class="page-head">
        <h2 class="page-h1" data-i="settings.heading"></h2>
      </div>
      <div class="card card-pad settings-card">
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
        <div class="action-toolbar">
          <button class="btn btn-primary" id="btnSave" type="button" data-i="settings.save"></button>
        </div>
      </div>
    </section>

    <section class="page" id="about">
      <div class="about-head">
        <img class="brand-logo brand-logo--sm" src="${logoUri}" alt="" width="44" height="44" />
        <div class="about-meta">
          <h2 class="page-h1" style="margin:0" data-i="about.heading"></h2>
          <p class="page-lead" style="margin:var(--sp-2) 0 0" data-i="about.body"></p>
        </div>
      </div>
      <p class="section-label" data-i="about.privacy.title"></p>
      <div class="privacy-grid">
        <div class="privacy-item"><b data-i="about.privacy.localLabel"></b><span data-i="about.privacy.local"></span></div>
        <div class="privacy-item"><b data-i="about.privacy.telemetryLabel"></b><span data-i="about.privacy.noTelemetry"></span></div>
        <div class="privacy-item"><b data-i="about.privacy.secretsLabel"></b><span data-i="about.privacy.noSecrets"></span></div>
        <div class="privacy-item"><b data-i="about.privacy.writeLabel"></b><span data-i="about.privacy.askWrite"></span></div>
      </div>
      <div class="card card-pad" style="margin-top:var(--sp-4)">
        <p class="meta-line"><span data-i="about.version"></span>: <strong id="ver"></strong></p>
        <p class="meta-line"><span data-i="about.author"></span>: <strong id="auth">DMCTN Studio</strong></p>
        <p class="meta-line"><span data-i="about.license"></span>: <strong id="lic">MIT</strong></p>
        <p class="meta-line" data-i="about.credits"></p>
        <div class="action-toolbar">
          <button class="btn btn-danger" id="btnRemove" type="button" data-i="about.removeBtn"></button>
        </div>
      </div>
    </section>
  </div>
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
    SKILLS.filter(s=>!used.has(s.id)).forEach(s=>wrap.appendChild(makeSkillRow(s)));
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
    badge.className='status-chip '+cls; badge.textContent=label;
    ov.className='status-big st '+(s.status==='installed'||s.status==='minimal'?'included':(s.status==='partial'?'modified':'missing'));
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
