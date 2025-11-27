import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// basePath removed - deploy to root path by default
	// If deploying to Webflow Cloud, set basePath: "/app" in your deployment config
};

export default nextConfig;
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
