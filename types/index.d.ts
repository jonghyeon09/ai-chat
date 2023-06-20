interface Generation {
  text: string;
  tokens: number;
}
interface Usage {
  prompt_tokens: number;
  generated_tokens: number;
  total_tokens: number;
}
export interface Answer {
  id: string;
  generations: Generation[];
  usage: Usage;
}
