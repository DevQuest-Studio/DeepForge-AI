// =======================
// Firebase Init
// =======================
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// =======================
// DOM Elements
// =======================
const userNameEl = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const templateFile = document.getElementById("templateFile");
const projectList = document.getElementById("projectList");
const aiOutput = document.getElementById("aiOutput");

// =======================
// State
// =======================
let currentUser = null;
let projects = [];
let templateContent = "";
let tickets = 50; // monthly default
let dailyLimit = 5;

// =======================
// Auth & Load
// =======================
auth.onAuthStateChanged(async (user) => {
    if (!user) return window.location.href = "index.html";
    currentUser = user;
    userNameEl.textContent = user.displayName;

    // Load user tickets
    const doc = await db.collection("users").doc(user.uid).get();
    if (doc.exists) {
        const data = doc.data();
        tickets = data.tickets ?? 50;
        dailyLimit = data.dailyLimit ?? 5;
    } else {
        // initialize new user
        await db.collection("users").doc(user.uid).set({
            tickets: tickets,
            dailyLimit: dailyLimit,
            lastReset: new Date().toISOString()
        });
    }

    loadProjects();
});

// Logout
logoutBtn.addEventListener("click", () => auth.signOut().then(() => window.location.href="index.html"));

// =======================
// Template Upload
// =======================
templateFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { templateContent = reader.result; };
    reader.readAsText(file);
});

// =======================
// Projects Management
// =======================
document.querySelectorAll(".newProjectBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
        const name = prompt("Project name:");
        if (!name) return;
        const project = { name, task: btn.dataset.task, history: [] };
        await db.collection("users").doc(currentUser.uid).collection("projects").add(project);
        loadProjects();
    });
});

async function loadProjects() {
    const snapshot = await db.collection("users").doc(currentUser.uid).collection("projects").get();
    projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderProjects();
}

function renderProjects() {
    projectList.innerHTML = "";
    projects.forEach((p, i) => {
        const li = document.createElement("li");
        li.textContent = p.name;
        li.setAttribute("tabindex", "0");
        li.addEventListener("click", () => loadProject(p));
        li.addEventListener("keypress", e => { if (e.key === "Enter") loadProject(p); });
        projectList.appendChild(li);
    });
}

function loadProject(project) {
    promptInput.value = project.history.length ? project.history[project.history.length - 1].prompt : "";
}

// =======================
// Ticket System
// =======================
async function checkTickets() {
    const userRef = db.collection("users").doc(currentUser.uid);
    const doc = await userRef.get();
    if (!doc.exists) return false;
    const data = doc.data();

    // Reset daily ticket usage if date changed
    const lastReset = new Date(data.lastReset);
    const now = new Date();
    if (lastReset.toDateString() !== now.toDateString()) {
        await userRef.update({ lastReset: now.toISOString(), dailyLimit });
        return true;
    }
    return data.dailyLimit > 0;
}

async function useTicket() {
    const userRef = db.collection("users").doc(currentUser.uid);
    const doc = await userRef.get();
    const data = doc.data();
    if (data.dailyLimit <= 0) return false;
    await userRef.update({ dailyLimit: data.dailyLimit - 1 });
    return true;
}

// =======================
// Gemini AI Call
// =======================
async function callGemini(prompt, task, template) {
    if (!await checkTickets()) {
        aiOutput.textContent = "Daily limit reached! Come back tomorrow.";
        return;
    }
    if (!await useTicket()) {
        aiOutput.textContent = "No tickets left!";
        return;
    }

    let fullPrompt = prompt;
    if (template) fullPrompt = `Use this template as reference:\n${template}\n\n` + prompt;

    // Show reasoning
    aiOutput.innerHTML = `<span class="reasoning">Thinking...</span>`;

    try {
        const resp = await fetch("https://api.gemini.example.com/v1/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GEMINI_API_KEY}`
            },
            body: JSON.stringify({
                model: GEMINI_MODELS.primary,
                prompt: fullPrompt,
                max_output_tokens: 1024
            })
        });
        const data = await resp.json();
        aiOutput.textContent = data.output || data.text || "";

        // Save history
        if (projects.length) {
            const projectId = projects[projects.length - 1].id;
            db.collection("users").doc(currentUser.uid)
              .collection("projects").doc(projectId)
              .update({
                  history: firebase.firestore.FieldValue.arrayUnion({ prompt, output: data.output || data.text })
              });
        }

    } catch (err) {
        aiOutput.textContent = "Error during AI generation.";
        console.error(err);
    }
}

// =======================
// Generate Button
// =======================
generateBtn.addEventListener("click", () => {
    const prompt = promptInput.value.trim();
    if (!prompt) return;
    const task = projects.length ? projects[projects.length - 1].task : "vehicle";
    callGemini(prompt, task, templateContent);
});
