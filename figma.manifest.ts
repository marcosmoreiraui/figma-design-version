// https://www.figma.com/plugin-docs/manifest/
export default {
	name: "Design version",
	id: "1213440435606193498",
	api: "1.0.0",
	main: "plugin.js",
	ui: "index.html",
	capabilities: [],
	permissions: [
		"currentuser",
		"activeusers",
		"fileusers"
	],
	enableProposedApi: false,
	editorType: ["figma"],
	networkAccess: {
		allowedDomains: ["https://*.figma.com"]
	}
};
