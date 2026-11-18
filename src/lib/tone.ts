// Section background: white (default), black (with the grain) or red. Each class sets the surface tokens in global.css.
export const toneClass = (tone?: string) => (tone === "black" ? "on-black grain" : tone === "red" ? "on-red" : "on-white");
