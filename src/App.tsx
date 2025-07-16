import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import AnimatedCard from './components/AnimatedCard';
import Issue from './components/Issue';
import SkeletonCard from './components/SkeletonCard';
import Toolbar from './components/Toolbar';
import config from './config';

import { AuthProvider, useAuth } from './hooks/useAuth';
import {
  ProcessedIssue,
  transformIssues,
} from './utils';
import { api, getIssuesQL } from './utils/request';

// Tailwind CSS 加载占位符组件
interface LoadingPlaceholderProps {
  visible: boolean;
  children: React.ReactNode;
}

const LoadingPlaceholder = ({ visible, children }: LoadingPlaceholderProps) => (
  <div 
    className={`min-h-[200px] w-full flex flex-col transition-opacity duration-300 ease-in-out ${
      visible ? 'visible opacity-100' : 'invisible opacity-0'
    }`}
  >
    {children}
  </div>
);

const App = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState<ProcessedIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRepoLoading, setIsRepoLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [rawIssuesData, setRawIssuesData] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentRepo, setCurrentRepo] = useState(() => {
    if (config.request.owner && config.request.repo) {
      return { owner: config.request.owner, repo: config.request.repo };
    }
    return { owner: '', repo: '' };
  });
  const [repoError, setRepoError] = useState<string | null>(null);

  const cursorRef = useRef<string | null>(null);
  const isLoadingRef = useRef(isLoading);
  const lastIssueRef = useRef<HTMLDivElement>(null);
  const currentUserRef = useRef(user?.login);
  const currentRepoRef = useRef(currentRepo);
  const loadMoreTriggeredRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    currentUserRef.current = user?.login;
  }, [user?.login]);

  useEffect(() => {
    currentRepoRef.current = currentRepo;
  }, [currentRepo]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
  }, []);

  const loadIssues = useCallback(async () => {
    const repo = currentRepoRef.current;
    console.log(
      'loadIssues called for repo:',
      `${repo.owner}/${repo.repo}`,
      'cursor:',
      cursorRef.current,
      'isLoading:',
      isLoadingRef.current,
    );
    try {
      const res = await api.post(
        '/graphql',
        getIssuesQL({
          owner: repo.owner,
          repo: repo.repo,
          cursor: cursorRef.current,
          pageSize: config.request.pageSize,
        }),
      );
      const data = res.data.data.repository.issues;
      const { hasNextPage: nextPage, endCursor } = data.pageInfo;

      setHasNextPage(nextPage);
      cursorRef.current = endCursor;

      const newRawIssuesData = [...rawIssuesData, ...data.nodes];
      setRawIssuesData(newRawIssuesData);

      setIssues((prev) => [
        ...prev,
        ...transformIssues(data.nodes, currentUserRef.current),
      ]);

      setIsLoading(false);
      loadMoreTriggeredRef.current = false;
    } catch (err) {
      console.error('err:', err);
      setIsLoading(false);
      loadMoreTriggeredRef.current = false;
    }
  }, [rawIssuesData]);

  const resetAndLoadNewRepo = useCallback(async () => {
    console.log('Resetting and loading new repo:', currentRepo);

    // 检查 owner 和 repo 是否为空
    if (!currentRepo.owner || !currentRepo.repo) {
      setIsLoading(false);
      setIsRepoLoading(false);
      setRepoError('Repository owner and name are required');
      return;
    }

    setIssues([]);
    setRawIssuesData([]);
    setHasNextPage(true);
    cursorRef.current = null;
    loadMoreTriggeredRef.current = false;
    lastScrollYRef.current = window.scrollY;
    setIsLoading(true);
    setIsRepoLoading(true);
    setRepoError(null);

    try {
      const res = await api.post(
        '/graphql',
        getIssuesQL({
          owner: currentRepo.owner,
          repo: currentRepo.repo,
          cursor: null,
          pageSize: config.request.pageSize,
        }),
      );

      if (res.data.errors) {
        throw new Error(res.data.errors[0]?.message || 'GraphQL Error');
      }

      if (!res.data.data?.repository) {
        throw new Error(
          `Repository ${currentRepo.owner}/${currentRepo.repo} not found or private`,
        );
      }

      const data = res.data.data.repository.issues;
      const { hasNextPage: nextPage, endCursor } = data.pageInfo;

      setHasNextPage(nextPage);
      cursorRef.current = endCursor;
      setRawIssuesData(data.nodes);
      setIssues(transformIssues(data.nodes, currentUserRef.current));

      setIsLoading(false);
      setIsRepoLoading(false);
      setRepoError(null);
    } catch (err) {
      console.error('Error loading new repo:', err);
      setIsLoading(false);
      setIsRepoLoading(false);
      setRepoError(
        err instanceof Error ? err.message : 'Failed to load repository',
      );
    }
  }, [currentRepo.owner, currentRepo.repo]);

  const handleRepoChange = useCallback((owner: string, repo: string) => {
    console.log('Repo changed to:', { owner, repo });
    setCurrentRepo({ owner, repo });
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollYRef.current = currentScrollY;

      console.log(
        'handleScroll check - scrollY:',
        currentScrollY,
        'lastScrollY:',
        lastScrollY,
        'scrollingDown:',
        isScrollingDown,
        'isLoading:',
        isLoadingRef.current,
        'hasNextPage:',
        hasNextPage,
        'triggered:',
        loadMoreTriggeredRef.current,
      );

      if (!isScrollingDown) {
        console.log('handleScroll blocked - scrolling up');
        return;
      }

      if (
        isLoadingRef.current ||
        !hasNextPage ||
        loadMoreTriggeredRef.current
      ) {
        console.log(
          'handleScroll blocked - already loading, no more pages, or already triggered',
        );
        return;
      }

      if (issues.length === 0) {
        console.log('handleScroll blocked - no issues loaded yet');
        return;
      }

      const lastIssueElement = lastIssueRef.current;
      if (!lastIssueElement) {
        console.log('handleScroll blocked - no last issue element');
        return;
      }

      const rect = lastIssueElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const isLastIssueVisible = rect.top < viewportHeight;

      console.log(
        'Scroll metrics - lastIssue.top:',
        rect.top,
        'viewportHeight:',
        viewportHeight,
        'isVisible:',
        isLastIssueVisible,
      );

      if (!isLastIssueVisible) {
        console.log('handleScroll blocked - last issue not yet visible');
        return;
      }

      console.log(
        'handleScroll triggered, starting new load for repo:',
        currentRepoRef.current,
      );
      loadMoreTriggeredRef.current = true;
      setIsLoading(true);
      loadIssues();
    }, 200);
  }, [loadIssues, hasNextPage, issues.length]);

  useEffect(() => {
    if (!isInitialized) {
      console.log('App mounted, initializing data load');
      setIsRepoLoading(true);
      resetAndLoadNewRepo();
      setIsInitialized(true);
    }
  }, [isInitialized, resetAndLoadNewRepo, currentRepo]);

  useEffect(() => {
    if (isInitialized) {
      window.removeEventListener('scroll', handleScroll);
      setIsRepoLoading(true); // repo 切换时设置 loading
      resetAndLoadNewRepo();
    }
  }, [currentRepo.owner, currentRepo.repo]);

  useEffect(() => {
    // 只有当初始化完成、有下一页、且至少有一些 issues 时才添加滚动监听器
    if (isInitialized && hasNextPage && issues.length > 0) {
      console.log(
        'Preparing to add scroll listener, issues count:',
        issues.length,
      );

      // 延迟添加滚动监听器，等待 DOM 更新完成
      const timeoutId = setTimeout(() => {
        // 再次检查 lastIssueRef 是否已经设置
        if (lastIssueRef.current) {
          console.log('Adding scroll listener, lastIssueRef exists');
          window.addEventListener('scroll', handleScroll, false);
        } else {
          console.log('lastIssueRef still null, will retry on next render');
        }
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }
      };
    }
  }, [isInitialized, hasNextPage, handleScroll, issues.length]);

  useEffect(() => {
    if (rawIssuesData.length > 0) {
      setIssues(transformIssues(rawIssuesData, user?.login));
    }
  }, [user?.login, rawIssuesData]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };
  }, []);

  // 骨架屏加载状态 - 只有在加载时才显示
  const showLoadingPlaceholder = isLoading || isRepoLoading;

  return (
    <div className="box-border">
      <Toolbar
        onRepoChange={handleRepoChange}
        currentRepo={currentRepo}
        isLoading={isRepoLoading}
        error={repoError}
      />
      {issues.length > 0 && (
        <>
          <div>
            <AnimatePresence mode="popLayout">
              {issues.map((issue, index) => (
                <AnimatedCard key={issue.id} id={issue.id}>
                  <div
                    ref={index === issues.length - 1 ? lastIssueRef : undefined}
                  >
                    <Issue
                      issue={issue}
                      repoOwner={currentRepo.owner}
                      repoName={currentRepo.repo}
                    />
                  </div>
                </AnimatedCard>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
      <LoadingPlaceholder visible={showLoadingPlaceholder}>
        <SkeletonCard />
        <SkeletonCard />
      </LoadingPlaceholder>
      {repoError && (
        <div className="flex flex-col items-center justify-center p-5 text-center">
          <span className="text-2xl mb-2.5">⚠️</span>
          <span className="text-lg font-bold">{repoError}</span>
          <span className="text-sm text-gray-600">
            Please check the repository name and try again.
          </span>
        </div>
      )}
    </div>
  );
};

const AppWithAuth = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithAuth;
