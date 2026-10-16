// Modos base do Raizinho (pose contínua, objeto na mão e animação de entrada)
const carry = (prop) => ({ prop, hold: "carry", intro: "present" });

export const ART_MODES = {
  idle: {},
  wave: { intro: "wave" },
  thumbsUp: { intro: "thumbs_up" },
  celebrate: { intro: "celebrate" },
  surprised: { intro: "surprised" },
  bow: { intro: "greeting" },
  greeting: { intro: "greeting" },
  thinking: { hold: "thinking", expr: "thinking" },
  jump: { intro: "jump" },
  plant: { intro: "plant" },
  spin: { intro: "spin" },
  sad: { hold: "sad", expr: "sad" },
  guardian: { level: 4, intro: "celebrate" },
  reading: { prop: "book", hold: "read", expr: "happy" },
  explorer: { prop: "magnifier", hold: "carry", intro: "explorer" },
  basket: carry("basket"),
  coffee: carry("coffee"),
  honey: carry("honey"),
  cacao: carry("cacao"),
  corn: carry("corn"),
  banana: carry("banana"),
};

// Qual objeto o Raizinho segura para cada produto
export function productProp(product) {
  if (!product) return "basket";
  const n = (product.name || "").toLowerCase();
  if (n.includes("café") || n.includes("cafe")) return "coffee";
  if (/\bmel\b/.test(n)) return "honey";
  if (n.includes("cacau") || n.includes("chocolate")) return "cacao";
  if (n.includes("milho")) return "corn";
  if (n.includes("banana")) return "banana";
  return { cafe: "coffee", mel: "honey", cacau: "cacao", graos: "corn" }[product.category] || "basket";
}

export function moodToExpression(mood) {
  return (
    {
      feliz: "idle", agradecido: "celebrate", pensativo: "thinking", semente: "plant",
      broto: "wave", arvore: "guardian", lupa: "explorer", carrinho: "basket",
      colhendo: "basket", estrelas: "guardian", coracao: "celebrate", mapa: "wave",
      livro: "reading", coroa: "guardian",
    }[mood] || "idle"
  );
}