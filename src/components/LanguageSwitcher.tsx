import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isZhActive = i18n.language === 'zh' || i18n.language === 'zh-CN';
  const isEnActive = i18n.language === 'en';

  return (
    <div className="flex items-center gap-2">
      <button
        className={`min-w-8 rounded-xl border px-2 py-1 text-xs font-medium transition-all duration-200 active:scale-95 
        ${isZhActive 
          ? 'border-blue-500 bg-blue-500 text-white hover:border-blue-600 hover:bg-blue-600' 
          : 'border-gray-200 bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50'
        }`}
        onClick={() => changeLanguage('zh')}
      >
        中
      </button>
      <button
        className={`min-w-8 rounded-xl border px-2 py-1 text-xs font-medium transition-all duration-200 active:scale-95
        ${isEnActive 
          ? 'border-blue-500 bg-blue-500 text-white hover:border-blue-600 hover:bg-blue-600' 
          : 'border-gray-200 bg-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50'
        }`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
