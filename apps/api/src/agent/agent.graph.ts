import { BaseMessage } from '@langchain/core/messages';
import { createAgent, modelCallLimitMiddleware } from 'langchain';
import {
  Annotation,
  END,
  START,
  StateGraph,
  messagesStateReducer,
} from '@langchain/langgraph';
import { LlmService } from 'src/llm/llm.service';
import { PromptService } from 'src/prompt/prompt.service';
import { RetrievalService } from 'src/retrieval/retrieval.service';
import { ToolRegistry } from 'src/tools/tools.registry';

export function isItemRecommendQuestion(question: string) {
  return /아이템|추천|빌드/.test(question);
}

export const AgentGraphState = Annotation.Root({
  question: Annotation<string>(),
  context: Annotation<string>(),
  useTools: Annotation<boolean>(),
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
});

export function compileAgentGraph(deps: {
  llmService: LlmService;
  promptService: PromptService;
  retrievalService: RetrievalService;
  toolRegistry: ToolRegistry;
}) {
  return new StateGraph(AgentGraphState)
    .addNode('retrieve', async (state) => {
      const hits = await deps.retrievalService.retrieve(state.question);
      const context = hits
        .map((hit) => hit.payload?.text)
        .filter((text): text is string => Boolean(text))
        .join('\n');

      return {
        context,
        useTools: isItemRecommendQuestion(state.question),
      };
    })
    .addNode('answer', async (state) => {
      const response = await deps.llmService.getModel().invoke([
        {
          role: 'system',
          content: deps.promptService.getContextAnswerSystemPrompt(),
        },
        {
          role: 'user',
          content: deps.promptService.buildAgentUserMessage(
            state.question,
            state.context,
          ),
        },
      ]);

      return { messages: [response] };
    })
    .addNode('tools', async (state) => {
      const agent = createAgent({
        model: deps.llmService.getModel(),
        tools: deps.toolRegistry.getAll(),
        systemPrompt: deps.promptService.getAgentSystemPrompt(),
        middleware: [
          modelCallLimitMiddleware({
            runLimit: 10,
            exitBehavior: 'end',
          }),
        ],
      });
      const result = await agent.invoke({
        messages: [
          {
            role: 'user',
            content: deps.promptService.buildAgentUserMessage(
              state.question,
              state.context,
            ),
          },
        ],
      });

      return { messages: result.messages };
    })
    .addEdge(START, 'retrieve')
    .addConditionalEdges(
      'retrieve',
      (state) => (state.useTools ? 'tools' : 'answer'),
      {
        tools: 'tools',
        answer: 'answer',
      },
    )
    .addEdge('answer', END)
    .addEdge('tools', END)
    .compile();
}
