const STATUSES = new Set(["Live", "In build"]);

const list = document.querySelector("#demo-list");
const summary = document.querySelector("#demo-summary");
const error = document.querySelector("#demo-error");

function linkLabel(url) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/$/, "");
    return parsed.host + path;
  } catch {
    return url;
  }
}

function badgeClass(status) {
  return status === "Live" ? "badge-live" : "badge-build";
}

function renderCard(demo, index) {
  const item = document.createElement("li");
  const linked = typeof demo.url === "string" && demo.url.startsWith("https://");
  item.className = linked ? "card" : "card card-static";

  const meta = document.createElement("div");
  meta.className = "meta";

  const badge = document.createElement("p");
  badge.className = `badge ${badgeClass(demo.status)}`;
  badge.textContent = STATUSES.has(demo.status) ? demo.status : "In build";
  meta.append(badge);

  if (demo.note) {
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = demo.note;
    meta.append(note);
  }

  const number = document.createElement("p");
  number.className = "index";
  number.setAttribute("aria-hidden", "true");
  number.textContent = String(index + 1).padStart(2, "0");
  meta.append(number);

  const title = document.createElement("h3");
  title.className = "title";

  const titleText = demo.title || "Untitled";
  if (linked) {
    const link = document.createElement("a");
    link.href = demo.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = titleText;
    const extra = document.createElement("span");
    extra.className = "visually-hidden";
    extra.textContent = " (opens in a new tab)";
    link.append(extra);
    title.append(link);
  } else {
    title.textContent = titleText;
  }

  const description = document.createElement("p");
  description.className = "desc";
  description.textContent = demo.description || "";

  const action = document.createElement("p");
  action.className = "action";
  action.textContent = linked ? linkLabel(demo.url) : "No public link yet";

  item.append(meta, title, description, action);
  return item;
}

function showError(message) {
  error.hidden = false;
  error.textContent = message;
  list.hidden = true;
}

async function loadDemos() {
  let payload;
  try {
    const response = await fetch(new URL("demos.json", document.baseURI));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    payload = await response.json();
  } catch {
    showError("Demos could not be loaded from demos.json. Serve this folder over HTTP and reload.");
    return;
  }

  const demos = Array.isArray(payload.demos) ? payload.demos : null;
  if (!demos) {
    showError("demos.json is missing a demos list.");
    return;
  }

  const live = demos.filter((demo) => demo.status === "Live").length;
  const building = demos.length - live;
  summary.textContent = `${live} live · ${building} in build`;

  const fragment = document.createDocumentFragment();
  demos.forEach((demo, index) => fragment.append(renderCard(demo, index)));
  list.replaceChildren(fragment);
  list.hidden = false;
}

loadDemos();
