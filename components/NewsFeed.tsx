import React, { useEffect, useState } from 'react';
import { StudentField, NewsItem } from '../types';
import { fetchFieldNews } from '../services/gemini';

type NewsFeedProps = {
  field: StudentField;
};

const NewsFeed: React.FC<NewsFeedProps> = ({ field }) => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      setLoading(true);
      const result = await fetchFieldNews(field);
      if (!isActive) {
        return;
      }
      setSummary(result.text);
      setNews(result.news || []);
      setLoading(false);
    };

    load();

    return () => {
      isActive = false;
    };
  }, [field]);

  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 h-full overflow-auto">
      <h3 className="text-lg font-semibold mb-3">Latest Updates</h3>
      {loading ? (
        <p className="text-sm text-slate-500">Loading current updates...</p>
      ) : (
        <>
          <p className="text-sm text-slate-700 whitespace-pre-wrap mb-4">{summary || 'No updates found yet.'}</p>
          <ul className="space-y-2">
            {news.slice(0, 8).map((item, idx) => (
              <li key={`${item.uri}-${idx}`} className="text-sm">
                <a className="text-indigo-600 hover:underline" href={item.uri} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default NewsFeed;
