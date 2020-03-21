export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getCols(line: string): string[] {
  return line.split('\t');
}
