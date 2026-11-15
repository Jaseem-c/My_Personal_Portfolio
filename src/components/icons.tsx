import type { SVGProps } from "react";
import { Mail, Phone } from "lucide-react";
import {
  siBootstrap,
  siClaude,
  siCss,
  siCursor,
  siDash,
  siDocker,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siGithubcopilot,
  siGo,
  siGooglegemini,
  siGrafana,
  siHtml5,
  siJavascript,
  siKeycloak,
  siLangchain,
  siLens,
  siMongodb,
  siMqtt,
  siMysql,
  siNodedotjs,
  siNodered,
  siPlotly,
  siPocketbase,
  siPrometheus,
  siPython,
  siReact,
  siStreamlit,
  siSwagger,
  siTypescript,
  siWhatsapp,
  type SimpleIcon,
} from "simple-icons";
import type { SocialKey } from "@/types";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function SimpleSvg({ icon, size = 16, ...rest }: IconProps & { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      {...rest}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return <SimpleSvg icon={siGithub} {...props} />;
}

export function WhatsappIcon(props: IconProps) {
  return <SimpleSvg icon={siWhatsapp} {...props} />;
}

export function LinkedinIcon({ size = 16, ...rest }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...rest}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function SocialIcon({ name, size = 16, className }: { name: SocialKey; size?: number; className?: string }) {
  switch (name) {
    case "github":
      return <GithubIcon size={size} className={className} />;
    case "linkedin":
      return <LinkedinIcon size={size} className={className} />;
    case "whatsapp":
      return <WhatsappIcon size={size} className={className} />;
    case "email":
      return <Mail size={size} className={className} aria-hidden="true" />;
    case "phone":
      return <Phone size={size} className={className} aria-hidden="true" />;
  }
}

/** Technology logos (from Simple Icons, CC0). Keys match skill/tech names used in data. */
const techIcons: Record<string, SimpleIcon> = {
  Go: siGo,
  "Go Fiber": siGo,
  Fiber: siGo,
  Goroutines: siGo,
  Python: siPython,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  FastAPI: siFastapi,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  "Swagger / OpenAPI": siSwagger,
  LangChain: siLangchain,
  "React.js": siReact,
  React: siReact,
  HTML5: siHtml5,
  CSS3: siCss,
  Bootstrap: siBootstrap,
  MongoDB: siMongodb,
  PocketBase: siPocketbase,
  MySQL: siMysql,
  Docker: siDocker,
  Git: siGit,
  GitHub: siGithub,
  Lens: siLens,
  Prometheus: siPrometheus,
  Grafana: siGrafana,
  Keycloak: siKeycloak,
  Streamlit: siStreamlit,
  Plotly: siPlotly,
  Dash: siDash,
  "Node-RED": siNodered,
  MQTT: siMqtt,
  Cursor: siCursor,
  Claude: siClaude,
  "Gemini API": siGooglegemini,
  "GitHub Copilot": siGithubcopilot,
};

/** Brand colours that are too dark/light to read on either theme fall back to currentColor. */
function usableColor(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const l = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return l > 0.22 && l < 0.85 ? `#${hex}` : undefined;
}

export function TechIcon({ name, size = 14 }: { name: string; size?: number }) {
  const icon = techIcons[name];
  if (!icon) return null;
  return <SimpleSvg icon={icon} size={size} style={{ color: usableColor(icon.hex) }} className="shrink-0" />;
}

export function hasTechIcon(name: string) {
  return name in techIcons;
}
