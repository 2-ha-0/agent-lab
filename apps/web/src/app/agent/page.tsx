import { AgentPageClient } from './agent-page-client';

export const maxDuration = 120;

export const metadata = {
  title: '에이전트 경로 | Cosmic Forge',
  description: '질문이 검색·모델·툴을 어떤 순서로 거치는지 시각화합니다.',
};

export default function AgentPage() {
  return <AgentPageClient />;
}
