import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AiAgentsPage() {
  const t = useTranslations('ai_agents');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#251C6B]">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Candidate Mapping Agent Card */}
        <Link href="/ai-agents/candidate-mapping" className="block">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-[#251C6B]">{t('candidate_mapping.title')}</h2>
            <p className="text-gray-600">{t('candidate_mapping.description')}</p>
          </div>
        </Link>
        {/* More agent cards will be added here in the future */}
      </div>
    </div>
  );
} 