import React, { useState, useEffect } from 'react';
import WidgetCard from '../ui/WidgetCard';
import { AIIcon } from '../icons/EliteIcons';
import type { PortfolioItem } from '../../data/portfolioData';
import { useLocalization } from '../../localization/LocalizationContext';

interface AIEvaluationWidgetProps {
  property: PortfolioItem | null;
}

const evaluationCache = new Map<string, string>();

const AIEvaluationWidget: React.FC<AIEvaluationWidgetProps> = ({ property }) => {
  const { t, language } = useLocalization();
  const [evaluation, setEvaluation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!property) {
      setEvaluation('');
      setError('');
      setLoading(false);
      return;
    }

    const cacheKey = `${property.id}-${language}`;
    if (evaluationCache.has(cacheKey)) {
        setEvaluation(evaluationCache.get(cacheKey)!);
        setLoading(false);
        setError('');
        return;
    }

    const generateEvaluation = async () => {
      setLoading(true);
      setEvaluation('');
      setError('');
      try {
        const propertyName = t(property.nameKey);
        const propertyLocation = t(property.locationKey);
        const propertyDescription = t(property.descriptionKey);
        const propertyFeatures = property.featureKeys.map(key => t(key)).join(', ');

        const prompt = `
          You are a senior investment analyst at VESTRA ESTATES, a top-tier real estate consultancy for ultra-high-net-worth individuals. Your task is to generate a concise, professional investment memorandum for the following property.

          Property Details:
          - Name: ${propertyName}
          - Location: ${propertyLocation}
          - Value: ${property.value}
          - Description: ${propertyDescription}
          - Key Features: ${propertyFeatures}

          Your memorandum should include:
          1.  **Executive Summary:** A brief, high-level overview.
          2.  **Strategic Value:** Why this asset is a good fit for a discerning investor's portfolio (e.g., trophy asset, capital appreciation potential, unique location).
          3.  **Potential Risks:** A brief mention of potential market or property-specific risks.
          4.  **Recommendation:** A concluding professional recommendation.

          Maintain a sophisticated, data-driven, and confidential tone. Do not use markdown formatting. Structure the response with clear headings.
        `;
        
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch AI evaluation');
        }

        const data = await response.json();
        const resultText = data.text;
        setEvaluation(resultText);
        evaluationCache.set(cacheKey, resultText);

      } catch (err: any) {
        console.error("AI evaluation error:", err);
        const errorMessage = String(err.message);
        if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
          setError(t('widgets.errors.rateLimit'));
        } else {
          setError(t('widgets.aiEvaluation.error'));
        }
      } finally {
        setLoading(false);
      }
    };

    generateEvaluation();
  }, [property, t, language]);

  const renderContent = () => {
    if (!property) {
      return <p className="text-sm text-center text-gray-500">{t('widgets.aiEvaluation.selectProperty')}</p>;
    }
    if (loading) {
      return (
          <div className="flex flex-col items-center justify-center h-48">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="ml-2">{t('widgets.aiEvaluation.analyzing')}</span>
              </div>
          </div>
      );
    }
    if (error) {
      return <p className="text-sm text-center text-red-400">{error}</p>;
    }
    return (
      <div className="text-sm text-gray-300 whitespace-pre-wrap font-mono space-y-3">
        {evaluation}
      </div>
    );
  };

  return (
    <WidgetCard title={t('widgets.aiEvaluation.title')} actionIcon={<AIIcon className="w-4 h-4" />}>
      {renderContent()}
    </WidgetCard>
  );
};

export default AIEvaluationWidget;
