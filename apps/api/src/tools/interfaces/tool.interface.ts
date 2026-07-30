export interface Tool {
  name: string;

  description: string;

  execute(input: string): Promise<any>;
}
