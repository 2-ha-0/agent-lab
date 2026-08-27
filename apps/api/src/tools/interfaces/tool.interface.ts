export interface Tool {
  name: string;

  description: string;

  parameters: Record<string, string>;

  execute(parameters: Record<string, any>): Promise<any>;
}
