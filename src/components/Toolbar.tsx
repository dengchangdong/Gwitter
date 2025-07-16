import { useTranslation } from 'react-i18next';
import config from '../config';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';

interface ToolbarProps {
  onRepoChange: (owner: string, repo: string) => void;
  currentRepo: { owner: string; repo: string };
  isLoading?: boolean;
  error?: string | null;
}

const Toolbar = ({
  currentRepo,
  isLoading = false,
}: ToolbarProps) => {
  const { t } = useTranslation();
  const { isAuthenticated, user, login, logout, isLoading: authLoading } =
    useAuth();

  return (
    <div className="relative flex w-full flex-row items-center justify-between gap-2.5 animate-fadeInDown p-3 sm:p-2 sm:gap-1.5">
      <div className="text-blue-500 text-xl font-bold cursor-default select-none -tracking-tight sm:text-base">
        {config.app.siteName}
      </div>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        {isLoading ? (
          <div className="h-6 w-6 rounded-full border-2 border-blue-200 border-t-blue-500 animate-spin sm:h-5 sm:w-5"></div>
        ) : isAuthenticated && user ? (
          <div className="ml-2 flex items-center gap-2 sm:gap-1 sm:ml-1">
            <div className="relative h-[30px] w-[30px] cursor-pointer sm:h-[26px] sm:w-[26px]">
              <img 
                src={user.avatarUrl} 
                alt={user.login} 
                className="h-full w-full rounded-full object-cover transition-all duration-200 hover:scale-105 hover:shadow-[0_0_0_2px_rgba(29,155,240,0.3)]"
              />
            </div>
            <button 
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full bg-transparent px-3 py-1.5 text-sm text-blue-500 transition-all duration-200 hover:bg-blue-50/50 active:scale-[0.98] sm:text-xs sm:px-2 sm:py-1"
            >
              {t('auth.logout')}
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            disabled={authLoading}
            className={`flex items-center gap-1.5 rounded-full bg-transparent px-3 py-1.5 text-sm text-blue-500 transition-all duration-200 hover:bg-blue-50/50 active:scale-[0.98] sm:text-xs sm:px-2 sm:py-1 ${
              authLoading ? 'opacity-60' : 'opacity-100'
            }`}
          >
            {authLoading ? t('auth.loading') : t('auth.login')}
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
