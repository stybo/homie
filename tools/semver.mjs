import { execSync } from "node:child_process";

export function getNextVersion() {
	let latestTag = "0.0.0";
	let range = "HEAD";
	try {
		const rawTag = execSync("git describe --tags --abbrev=0 2>/dev/null", { encoding: "utf8" }).trim();
		if (rawTag.length > 0) {
			latestTag = rawTag.replace(/^v/, "");
			range = `${rawTag}..HEAD`;
		}
	} catch {
		// No previous tag found in repository, check commits up to HEAD
	}

	const parts = latestTag.split(".").map((n) => Number.parseInt(n, 10) || 0);
	let major = parts[0] ?? 0;
	let minor = parts[1] ?? 0;
	let patch = parts[2] ?? 0;

	let commitLogs = "";
	try {
		commitLogs = execSync(`git log ${range} --oneline`, { encoding: "utf8" });
	} catch {
		// Ignore git log failure
	}

	const isMajor = /^[a-f0-9]+ [a-z]+(\([^)]+\))?!:|BREAKING CHANGE/im.test(commitLogs);
	const isMinor = /^[a-f0-9]+ feat(\([^)]+\))?:/im.test(commitLogs);

	if (isMajor) {
		major += 1;
		minor = 0;
		patch = 0;
	} else if (isMinor) {
		minor += 1;
		patch = 0;
	} else {
		patch += 1;
	}

	const nextVersion = `${major}.${minor}.${patch}`;
	const nextTag = `v${nextVersion}`;

	return { latestTag, nextTag, nextVersion };
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
	const { nextTag, nextVersion } = getNextVersion();
	console.log(`VERSION=${nextVersion}`);
	console.log(`TAG=${nextTag}`);
}
