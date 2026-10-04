import { execSync } from "node:child_process";
import fs from "node:fs";

async function getChangelogUrl(pkgName) {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 3000);
		const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkgName)}`, {
			headers: { Accept: "application/json" },
			signal: controller.signal,
		});
		clearTimeout(timeout);

		if (!res.ok) {
			return `https://www.npmjs.com/package/${pkgName}`;
		}

		const data = await res.json();
		const rawUrl = String(data.repository?.url ?? data.repository ?? "");

		if (rawUrl.length > 0) {
			const match = rawUrl.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
			if (match) {
				return `https://github.com/${match[1]}/${match[2]}/releases`;
			}
		}

		if (data.homepage) {
			return data.homepage;
		}
	} catch {
		// Ignore network failure and fall back
	}

	return `https://www.npmjs.com/package/${pkgName}`;
}

export async function generateChangelog({ baseRef = "HEAD", outputFile = null } = {}) {
	let oldPkg = {};
	try {
		const oldContent = execSync(`git show ${baseRef}:package.json`, { encoding: "utf8" });
		oldPkg = JSON.parse(oldContent);
	} catch (err) {
		console.warn(`Could not read package.json from ${baseRef}:`, err.message);
	}

	const newContent = fs.readFileSync("package.json", "utf8");
	const newPkg = JSON.parse(newContent);

	const diffs = [];

	const sections = [
		{ key: "dependencies", label: "dependency" },
		{ key: "devDependencies", label: "devDependency" },
	];

	for (const { key, label } of sections) {
		const oldDeps = oldPkg[key] || {};
		const newDeps = newPkg[key] || {};

		for (const [name, newVer] of Object.entries(newDeps)) {
			const oldVer = oldDeps[name];
			if (!oldVer) {
				diffs.push({ name, type: label, newVer, oldVer: "—" });
			} else if (oldVer !== newVer) {
				diffs.push({ name, type: label, newVer, oldVer });
			}
		}
	}

	if (oldPkg.packageManager !== newPkg.packageManager && newPkg.packageManager) {
		diffs.push({
			name: "packageManager",
			type: "tool",
			newVer: newPkg.packageManager,
			oldVer: oldPkg.packageManager || "—",
		});
	}

	if (diffs.length === 0) {
		const emptyBody = "No dependencies updated.\n";
		if (outputFile) fs.writeFileSync(outputFile, emptyBody);
		return emptyBody;
	}

	const rows = await Promise.all(
		diffs.map(async (d) => {
			if (d.name === "packageManager") {
				return `| \`packageManager\` | \`tool\` | \`${d.oldVer}\` | \`${d.newVer}\` | [pnpm Releases](https://github.com/pnpm/pnpm/releases) |`;
			}
			const url = await getChangelogUrl(d.name);
			return `| \`${d.name}\` | \`${d.type}\` | \`${d.oldVer}\` | \`${d.newVer}\` | [Release Notes](${url}) |`;
		}),
	);

	const markdown = [
		"Automated dependency update created by GitHub Actions.",
		"",
		"### 📦 Updated Dependencies",
		"",
		"| Package | Type | Previous | Updated | Changelog |",
		"| :--- | :--- | :--- | :--- | :--- |",
		...rows,
		"",
		"### ✅ Quality Checks",
		"- Auto-formatted and linted via `vp check --fix`",
		"- Verified tests with `vp test`",
		"- Verified build with `vp build`",
	].join("\n");

	if (outputFile) {
		fs.writeFileSync(outputFile, markdown);
	}

	return markdown;
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
	const outputArgIndex = process.argv.indexOf("--output");
	const outputFile = outputArgIndex !== -1 ? process.argv[outputArgIndex + 1] : null;
	const baseArgIndex = process.argv.indexOf("--base");
	const baseRef = baseArgIndex !== -1 ? process.argv[baseArgIndex + 1] : "HEAD";

	const md = await generateChangelog({ baseRef, outputFile });
	if (!outputFile) {
		console.log(md);
	}
}
