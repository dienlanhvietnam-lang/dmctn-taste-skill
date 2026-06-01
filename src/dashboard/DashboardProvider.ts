/**
 * DashboardProvider.ts - Webview dashboard song ngữ, 7 tab.
 * Phụ thuộc "vscode". Logic nghiệp vụ ủy thác cho core/*.
 */

import * as vscode from 'vscode';
import { getMessages, Lang, LangSetting } from '../i18n';
import { detect } from '../core/detector';
import { installToProject, getCoreFiles, InstallMode } from '../core/installer';
import { updateSkills, removeFromProject, findModifiedFiles, skillStatus } from '../core/updater';
import { generatePrompt, PRESETS, PresetId } from '../core/promptGenerator';
import { SKILLS } from '../core/skills';
import {
  getWorkspaceRoot,
  getActiveLang,
  getLanguageSetting,
  getNeverAsk,
  getDefaultPack,
  getBackupBeforeUpdate,
  setLanguageSetting,
  setNeverAsk,
  setDefaultPack,
  setBackupBeforeUpdate,
  getAssetsDir
} from '../util';

function nonce(): string {
  let text = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

function authorName(pkg: any): string {
  const a = pkg?.author;
  if (!a) {
    return 'DMCTN Studio';
  }
  return typeof a === 'string' ? a : a.name || 'DMCTN Studio';
}

export class DashboardProvider {
  public static current: DashboardProvider | undefined;
  private static readonly viewType = 'dmctnTaste.dashboard';

  private readonly panel: vscode.WebviewPanel;
  private readonly context: vscode.ExtensionContext;
  private disposables: vscode.Disposable[] = [];

  public static show(context: vscode.ExtensionContext): void {
    const column = vscode.window.activeTextEditor?.viewColumn ?? vscode.ViewColumn.One;
    if (DashboardProvider.current) {
      DashboardProvider.current.panel.reveal(column);
      DashboardProvider.current.postState();
      return;
    }
    const panel = vscode.window.createWebviewPanel(
      DashboardProvider.viewType,
      'DMCTN Taste Skill',
      column,
      { enableScripts: true, retainContextWhenHidden: true }
    );
    DashboardProvider.current = new DashboardProvider(panel, context);
  }

  private constructor(panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
    this.panel = panel;
    this.context = context;
    this.panel.webview.html = this.html();
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    this.panel.webview.onDidReceiveMessage((m) => this.onMessage(m), null, this.disposables);
  }

  public postState(): void {
    const lang = getActiveLang();
    const root = getWorkspaceRoot();
    const assets = getAssetsDir(this.context);
    const det = root ? detect(root) : undefined;
    const status = det?.status ?? 'missing';
    const states = root ? skillStatus(root, assets) : [];
    const stateMap: Record<string, string> = {};
    for (const s of states) {
      stateMap[s.id] = s.state;
    }
    const pkg = this.context.extension.packageJSON;

    this.panel.webview.postMessage({
      type: 'state',
      lang,
      messages: getMessages(lang),
      status,
      skillsInstalled: det?.skillsInstalled ?? 0,
      skillsTotal: det?.skillsTotal ?? 0,
      hasWorkspace: !!root,
      version: pkg.version,
      author: authorName(pkg),
      license: pkg.license || 'MIT',
      languageSetting: getLanguageSetting(),
      neverAsk: getNeverAsk(),
      defaultPack: getDefaultPack(),
      backup: getBackupBeforeUpdate(),
      coreFiles: getCoreFiles(),
      presets: PRESETS,
      skills: SKILLS.map((s) => ({
        id: s.id,
        name: s.name[lang],
        desc: s.desc[lang],
        minimal: s.minimal,
        state: root ? stateMap[s.id] || 'missing' : 'missing'
      }))
    });
  }

  private toast(text: string): void {
    this.panel.webview.postMessage({ type: 'toast', text });
  }

  private async onMessage(msg: any): Promise<void> {
    const lang: Lang = getActiveLang();
    const m = getMessages(lang);
    const root = getWorkspaceRoot();

    switch (msg?.type) {
      case 'ready':
        this.postState();
        break;

      case 'check': {
        if (!root) {
          this.toast(m['install.noWorkspace']);
          break;
        }
        this.postState();
        const r = detect(root);
        const label =
          r.status === 'installed'
            ? m['status.installed']
            : r.status === 'minimal'
              ? m['status.minimal']
              : r.status === 'partial'
                ? m['status.partial']
                : m['status.missing'];
        this.toast(label);
        break;
      }

      case 'install': {
        if (!root) {
          this.toast(m['install.noWorkspace']);
          break;
        }
        const mode = (msg.mode as InstallMode) || 'minimal';
        const result = installToProject(root, getAssetsDir(this.context), {
          mode,
          skills: Array.isArray(msg.skills) ? msg.skills : undefined
        });
        this.toast(
          m['install.done'] + (result.skipped.length > 0 ? ` (skip ${result.skipped.length})` : '')
        );
        this.postState();
        break;
      }

      case 'update': {
        if (!root) {
          this.toast(m['install.noWorkspace']);
          break;
        }
        await this.doUpdate(root, m);
        this.postState();
        break;
      }

      case 'remove': {
        if (!root) {
          this.toast(m['install.noWorkspace']);
          break;
        }
        const yes = lang === 'vi' ? 'Xoá' : 'Remove';
        const ok = await vscode.window.showWarningMessage(m['msg.removeConfirm'], { modal: true }, yes);
        if (ok === yes) {
          removeFromProject(root);
          this.toast(m['msg.removeDone']);
          this.postState();
        }
        break;
      }

      case 'generatePrompt': {
        const text = generatePrompt({
          preset: msg.preset as PresetId,
          projectName: msg.projectName,
          lang
        });
        this.panel.webview.postMessage({ type: 'prompt', text });
        break;
      }

      case 'copy': {
        const text = String(msg.text ?? '');
        if (!text.trim()) {
          this.toast(m['prompts.choosePreset']);
          break;
        }
        await vscode.env.clipboard.writeText(text);
        this.toast(m['prompts.copiedShort']);
        break;
      }

      case 'saveSettings': {
        await setLanguageSetting(msg.language as LangSetting);
        await setNeverAsk(!!msg.neverAsk);
        if (msg.defaultPack === 'minimal' || msg.defaultPack === 'full') {
          await setDefaultPack(msg.defaultPack);
        }
        await setBackupBeforeUpdate(!!msg.backup);
        this.toast(m['settings.saved']);
        this.postState();
        break;
      }
    }
  }

  private async doUpdate(root: string, m: Record<string, string>): Promise<void> {
    const assets = getAssetsDir(this.context);
    const modified = findModifiedFiles(root, assets);
    let overwrite = false;
    if (modified.length > 0) {
      const choice = await vscode.window.showWarningMessage(
        m['msg.overwriteConfirm'] + '\n' + modified.join(', '),
        { modal: true },
        m['msg.install']
      );
      overwrite = choice === m['msg.install'];
    }
    const result = updateSkills(root, assets, {
      overwriteModified: overwrite,
      backup: getBackupBeforeUpdate()
    });
    this.toast(result.backedUp.length > 0 ? m['msg.updateBackup'] : m['install.done']);
  }

  private dispose(): void {
    DashboardProvider.current = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      this.disposables.pop()?.dispose();
    }
  }

  private html(): string {
    const n = nonce();
    const csp = `default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${n}';`;
    return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta http-equiv="Content-Security-Policy" content="${csp}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>DMCTN Taste Skill</title>
<style>
  :root{
    --bg:#11150f; --surface:#1a2016; --surface2:#222a1d; --text:#e8ece3;
    --muted:#9aa890; --border:#33402b; --bamboo:#4f7a37; --bamboo-2:#3f6a2b;
    --red:#8c2f2a; --gold:#c9a227; --ok:#4f7a37; --warn:#c9a227; --danger:#8c2f2a;
    --radius:8px;
  }
  *{box-sizing:border-box;}
  body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:var(--bg);color:var(--text);font-size:14px;line-height:1.55;}
  .app{display:flex;min-height:100vh;}
  .side{width:212px;flex:0 0 212px;background:var(--surface);border-right:1px solid var(--border);
    padding:16px 12px;display:flex;flex-direction:column;gap:3px;}
  .brand{font-weight:700;font-size:15px;padding:6px 10px 2px;}
  .brand small{display:block;color:var(--muted);font-weight:400;font-size:11px;margin-top:3px;line-height:1.4;}
  .navbtn{text-align:left;background:transparent;border:none;color:var(--muted);
    padding:9px 11px;border-radius:7px;cursor:pointer;font-size:13px;}
  .navbtn:hover{background:var(--surface2);color:var(--text);}
  .navbtn.active{background:var(--bamboo);color:#fff;}
  .badge{margin-top:auto;font-size:12px;padding:8px 10px;border-radius:7px;text-align:center;font-weight:600;}
  .badge.ok{background:rgba(79,122,55,.22);color:#9ccb78;}
  .badge.no{background:rgba(140,47,42,.22);color:#e09a96;}
  .badge.part{background:rgba(201,162,39,.20);color:#e2c766;}
  .main{flex:1;padding:26px 30px;overflow:auto;}
  .page{display:none;max-width:780px;}
  .page.active{display:block;}
  h1{font-size:21px;margin:0 0 6px;}
  h2{font-size:14px;margin:18px 0 8px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);}
  p{color:var(--muted);margin:6px 0;}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px;margin:12px 0;}
  ul.files{list-style:none;padding:0;margin:8px 0;}
  ul.files li{font-family:ui-monospace,Consolas,monospace;font-size:12px;color:var(--text);
    padding:5px 9px;background:var(--surface2);border-radius:5px;margin:3px 0;}
  button.act{background:var(--bamboo);color:#fff;border:none;padding:9px 15px;border-radius:7px;
    cursor:pointer;font-size:13px;font-weight:600;}
  button.act:hover{background:var(--bamboo-2);}
  button.ghost{background:transparent;border:1px solid var(--border);color:var(--text);}
  button.ghost:hover{background:var(--surface2);}
  button.danger{background:var(--danger);border:none;color:#fff;}
  .row{display:flex;gap:9px;flex-wrap:wrap;align-items:center;margin-top:10px;}
  label{display:block;font-size:12px;color:var(--muted);margin:12px 0 4px;}
  select,input[type=text]{width:100%;background:var(--surface2);border:1px solid var(--border);
    color:var(--text);padding:9px 10px;border-radius:7px;font-size:13px;}
  textarea{width:100%;min-height:300px;background:#0c0f09;border:1px solid var(--border);color:var(--text);
    padding:14px;border-radius:7px;font-family:ui-monospace,Consolas,'Courier New',monospace;font-size:12.5px;line-height:1.5;}
  .hint{font-size:12px;color:var(--muted);margin:8px 0 12px;line-height:1.45;}
  .status-detail{font-size:12px;color:var(--muted);margin-top:6px;}
  .modes{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:6px;}
  .mode{background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:13px;}
  .mode b{display:block;margin-bottom:4px;font-size:14px;}
  .mode span{font-size:12px;}
  .mode button{margin-top:11px;width:100%;}
  .warn{font-size:12px;color:var(--gold);margin-top:10px;}
  .skill{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);}
  .skill:last-child{border-bottom:none;}
  .skill input{margin-top:3px;width:auto;}
  .skill .meta{flex:1;}
  .skill .meta b{font-size:13px;}
  .skill .meta p{margin:2px 0 0;font-size:12px;}
  .tag{font-size:10px;padding:2px 7px;border-radius:999px;margin-left:6px;vertical-align:middle;}
  .tag.min{background:rgba(201,162,39,.18);color:var(--gold);}
  .st{font-size:11px;font-weight:600;padding:3px 8px;border-radius:999px;white-space:nowrap;}
  .st.included{background:rgba(79,122,55,.22);color:#9ccb78;}
  .st.missing{background:rgba(140,47,42,.20);color:#e09a96;}
  .st.modified{background:rgba(201,162,39,.20);color:#e2c766;}
  .check{display:flex;align-items:center;gap:8px;margin-top:12px;}
  .check input{width:auto;}
  .gtitle{font-weight:600;color:var(--text);margin-top:14px;}
  .toast{position:fixed;bottom:18px;right:18px;background:var(--bamboo);color:#fff;padding:11px 16px;
    border-radius:7px;opacity:0;transform:translateY(10px);transition:.22s;pointer-events:none;font-size:13px;max-width:60%;}
  .toast.show{opacity:1;transform:translateY(0);}
  @media(max-width:640px){.app{flex-direction:column;}.side{width:100%;flex:none;flex-direction:row;
    flex-wrap:wrap;}.badge{margin:0;}.main{padding:16px;}}
</style>
</head>
<body>
<div class="app">
  <nav class="side">
    <div class="brand">DMCTN Taste<small data-i="app.subtitle"></small></div>
    <button class="navbtn active" data-tab="overview" data-i="nav.overview"></button>
    <button class="navbtn" data-tab="install" data-i="nav.install"></button>
    <button class="navbtn" data-tab="skills" data-i="nav.skills"></button>
    <button class="navbtn" data-tab="prompts" data-i="nav.prompts"></button>
    <button class="navbtn" data-tab="guide" data-i="nav.guide"></button>
    <button class="navbtn" data-tab="settings" data-i="nav.settings"></button>
    <button class="navbtn" data-tab="about" data-i="nav.about"></button>
    <div id="badge" class="badge no"></div>
  </nav>
  <main class="main">
    <section class="page active" id="overview">
      <h1 data-i="overview.heading"></h1>
      <p data-i="overview.intro"></p>
      <div class="card">
        <h2 data-i="overview.statusLabel"></h2>
        <div id="ovStatus" class="st missing"></div>
        <div class="row">
          <button class="act" id="ovMin" data-i="overview.installMinimal"></button>
          <button class="act ghost" id="ovFull" data-i="overview.installFull"></button>
          <button class="act ghost" data-goto="prompts" data-i="overview.openPrompt"></button>
          <button class="act ghost" id="ovCheck" data-i="overview.checkBtn"></button>
        </div>
      </div>
    </section>

    <section class="page" id="install">
      <h1 data-i="install.heading"></h1>
      <p data-i="install.desc"></p>
      <div class="modes">
        <div class="mode">
          <b data-i="install.modeMinimal"></b><span data-i="install.modeMinimal.desc"></span>
          <button class="act" id="instMin" data-i="install.btnMinimal"></button>
        </div>
        <div class="mode">
          <b data-i="install.modeFull"></b><span data-i="install.modeFull.desc"></span>
          <button class="act" id="instFull" data-i="install.btnFull"></button>
        </div>
        <div class="mode">
          <b data-i="install.modeCustom"></b><span data-i="install.modeCustom.desc"></span>
          <button class="act ghost" data-goto="skills" id="instCustom" data-i="install.modeCustom"></button>
        </div>
      </div>
      <p class="warn" data-i="install.overwriteWarn"></p>
      <div class="card">
        <h2 data-i="install.planFor"></h2>
        <ul class="files" id="planList"></ul>
        <div class="row">
          <button class="act ghost" id="btnUpdate" data-i="install.btnUpdate"></button>
        </div>
      </div>
    </section>

    <section class="page" id="skills">
      <h1 data-i="skills.heading"></h1>
      <p data-i="skills.intro"></p>
      <div class="card">
        <div class="row" style="margin-top:0">
          <label style="margin:0"><input type="checkbox" id="selAll" /> <span data-i="skills.selectAll"></span></label>
        </div>
        <div id="skillList"></div>
        <div class="row">
          <button class="act" id="btnInstallSel" data-i="skills.installSelected"></button>
        </div>
      </div>
    </section>

    <section class="page" id="prompts">
      <h1 data-i="prompts.heading"></h1>
      <p class="hint" data-i="prompts.tabHint"></p>
      <div class="card">
        <label data-i="prompts.choosePreset"></label>
        <select id="presetSel"></select>
        <label data-i="prompts.projectName"></label>
        <input type="text" id="projName" placeholder="MyApp" />
        <div class="row">
          <button class="act" id="btnGen" data-i="prompts.generate"></button>
          <button class="act ghost" id="btnCopy" data-i="prompts.copy"></button>
        </div>
        <label data-i="prompts.output"></label>
        <textarea id="promptOut" class="prompt-out" readonly placeholder="…"></textarea>
      </div>
    </section>

    <section class="page" id="guide">
      <h1 data-i="guide.heading"></h1>
      <div class="card">
        <div class="gtitle" data-i="guide.cursor.title"></div>
        <p data-i="guide.cursor.body"></p>
        <div class="gtitle" data-i="guide.vscode.title"></div>
        <p data-i="guide.vscode.body"></p>
        <div class="gtitle" data-i="guide.claude.title"></div>
        <p data-i="guide.claude.body"></p>
      </div>
    </section>

    <section class="page" id="settings">
      <h1 data-i="settings.heading"></h1>
      <div class="card">
        <label data-i="settings.language"></label>
        <select id="langSel">
          <option value="auto" data-i="settings.language.auto"></option>
          <option value="vi" data-i="settings.language.vi"></option>
          <option value="en" data-i="settings.language.en"></option>
        </select>
        <label data-i="settings.defaultPack"></label>
        <select id="packSel">
          <option value="minimal" data-i="settings.pack.minimal"></option>
          <option value="full" data-i="settings.pack.full"></option>
        </select>
        <div class="check">
          <input type="checkbox" id="backup" />
          <label for="backup" style="margin:0" data-i="settings.backup"></label>
        </div>
        <div class="check">
          <input type="checkbox" id="neverAsk" />
          <label for="neverAsk" style="margin:0" data-i="settings.neverAsk"></label>
        </div>
        <div class="row">
          <button class="act" id="btnSave" data-i="settings.save"></button>
        </div>
      </div>
    </section>

    <section class="page" id="about">
      <h1 data-i="about.heading"></h1>
      <div class="card">
        <p data-i="about.body"></p>
        <p><span data-i="about.version"></span>: <span id="ver"></span></p>
        <p><span data-i="about.author"></span>: <span id="auth">DMCTN Studio / Bùi Văn Tĩnh</span></p>
        <p><span data-i="about.license"></span>: <span id="lic">MIT</span></p>
        <p data-i="about.credits"></p>
        <div class="row">
          <button class="danger act" id="btnRemove" data-i="about.removeBtn"></button>
        </div>
      </div>
    </section>
  </main>
</div>
<div class="toast" id="toast"></div>

<script nonce="${n}">
  const vscode = acquireVsCodeApi();
  let MSG = {};
  let SKILLS = [];
  let CORE = [];

  function $(s){return document.querySelector(s);}
  function $all(s){return Array.from(document.querySelectorAll(s));}

  function applyI18n(){
    $all('[data-i]').forEach(el=>{
      const k = el.getAttribute('data-i');
      if (MSG[k] !== undefined) el.textContent = MSG[k];
    });
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

  function renderSkills(){
    const wrap = $('#skillList'); wrap.innerHTML='';
    SKILLS.forEach(s=>{
      const row=document.createElement('div'); row.className='skill';
      const cb=document.createElement('input'); cb.type='checkbox'; cb.className='skchk'; cb.value=s.id;
      cb.checked = s.minimal;
      cb.addEventListener('change',renderPlan);
      const meta=document.createElement('div'); meta.className='meta';
      const b=document.createElement('b'); b.textContent=s.name;
      if(s.minimal){ const tag=document.createElement('span'); tag.className='tag min'; tag.textContent=MSG['skills.minimalTag']||'minimal'; b.appendChild(tag); }
      const p=document.createElement('p'); p.textContent=s.desc;
      meta.appendChild(b); meta.appendChild(p);
      const st=document.createElement('span'); st.className='st '+s.state;
      st.textContent = MSG['skills.state.'+s.state]||s.state;
      row.appendChild(cb); row.appendChild(meta); row.appendChild(st);
      wrap.appendChild(row);
    });
    renderPlan();
  }

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
    let detail=$('#ovDetail');
    if(!detail){ detail=document.createElement('div'); detail.id='ovDetail'; detail.className='status-detail'; ov.parentNode.appendChild(detail); }
    if(s.hasWorkspace && s.skillsInstalled!=null){
      detail.textContent=(s.status==='partial'?MSG['status.partial.hint']+' ':'')+s.skillsInstalled+'/'+s.skillsTotal+' skills';
    } else { detail.textContent=''; }

    renderPresets(s.presets||[]);
    renderSkills();
    if($('#prompts').classList.contains('active')) requestPrompt();
  }

  // actions
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
  $('#btnSave').addEventListener('click',()=>vscode.postMessage({type:'saveSettings', language:$('#langSel').value, neverAsk:$('#neverAsk').checked, defaultPack:$('#packSel').value, backup:$('#backup').checked}));

  let toastTimer;
  function toast(text){ const el=$('#toast'); el.textContent=text; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2800); }

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
}
