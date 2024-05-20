import { type Config } from "tailwindcss";
import typography from "typography";
import daisyui from "daisyui";
export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  // plugins: [typography, daisyui as any],
  // daisyui: {
  //   themes: ["light", "dark", "lemonade", "autumn", "aqua", "nord", "retro" ],
  //   logs: false,
  // },
} satisfies Config;
