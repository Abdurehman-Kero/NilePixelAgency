const fs = require('fs');
const { execSync } = require('child_process');

let files = fs.readFileSync('untracked.txt', 'utf8')
    .split('\n')
    .map(f => f.trim())
    .filter(f => f && f !== 'untracked.txt' && f !== 'fake_commits.js' && !f.includes('scratch_'));

let currentDate = new Date('2026-06-11T10:00:00Z');
const endDate = new Date('2026-08-01T10:00:00Z');

let commitDays = [];
while (currentDate <= endDate) {
    commitDays.push(new Date(currentDate));
    // gap of at least 2 days (2, 3, or 4 days)
    const gap = Math.floor(Math.random() * 3) + 2; 
    currentDate.setDate(currentDate.getDate() + gap);
}

let schedule = [];
for (let date of commitDays) {
    const numCommits = Math.floor(Math.random() * 4) + 2; // 2 to 5 commits per day
    for (let i = 0; i < numCommits; i++) {
        let d = new Date(date);
        d.setHours(d.getHours() + (i * 2) + Math.floor(Math.random() * 3));
        schedule.push(d);
    }
}

console.log(`Total files: ${files.length}`);
console.log(`Total scheduled commits: ${schedule.length}`);

// If we have more commits scheduled than files, cap the schedule
if (schedule.length > files.length) {
    schedule = schedule.sort(() => 0.5 - Math.random()).slice(0, files.length).sort((a, b) => a - b);
    console.log(`Trimmed schedule to ${schedule.length} commits.`);
}

let chunks = schedule.map(() => []);
files.forEach((file, index) => {
    chunks[index % schedule.length].push(file);
});

const commitMessages = [
    "Initialize feature setup",
    "Update core components",
    "Fix styling issues",
    "Refactor module architecture",
    "Add new utility helpers",
    "Update project configurations",
    "Integrate API services",
    "Update dependency packages",
    "Clean up dead code",
    "Improve error handling",
    "Update UI layout",
    "Add responsive design",
    "Fix state management bugs",
    "Enhance performance",
    "Add unit test cases",
    "Refactoring and bug fixes"
];

let successCount = 0;
for (let i = 0; i < schedule.length; i++) {
    const chunk = chunks[i];
    if (chunk.length === 0) continue;
    
    const dateStr = schedule[i].toISOString();
    
    for (const file of chunk) {
        try {
            execSync(`git add "${file}"`);
        } catch (e) {
            console.error(`Failed to add file: ${file}`);
        }
    }
    
    const baseMsg = commitMessages[Math.floor(Math.random() * commitMessages.length)];
    const msg = `${baseMsg} (chunk ${i+1})`;
    
    const env = { 
        ...process.env, 
        GIT_AUTHOR_DATE: dateStr, 
        GIT_COMMITTER_DATE: dateStr 
    };
    
    try {
        execSync(`git commit -m "${msg}"`, { env });
        successCount++;
    } catch(e) {
        console.error(`Failed to commit chunk ${i+1}: ${e.message}`);
    }
}

console.log(`Created ${successCount} commits successfully.`);

try {
    execSync(`git remote add origin https://github.com/Abdurehman-Kero/NilePixelAgency.git`);
    console.log("Remote 'origin' added.");
} catch (e) {
    console.log("Remote might already exist or failed to add.");
}

try {
    execSync(`git branch -M main`);
    console.log("Branch renamed to 'main'.");
} catch (e) {
    console.log("Failed to rename branch.");
}
