const LAST_REPO_KEY = 'gwitter_last_repo';

export const saveLastRepo = (owner: string, repo: string) => {
  try {
    const repoData = { owner, repo };
    localStorage.setItem(LAST_REPO_KEY, JSON.stringify(repoData));
    console.log('Saved last repo:', `${owner}/${repo}`);
  } catch (error) {
    console.warn('Failed to save last repo:', error);
  }
};

export const loadLastRepo = (): { owner: string; repo: string } | null => {
  try {
    const cached = localStorage.getItem(LAST_REPO_KEY);
    if (cached) {
      const repoData = JSON.parse(cached);
      console.log('Loaded last repo:', `${repoData.owner}/${repoData.repo}`);
      return repoData;
    }
    return null;
  } catch (error) {
    console.warn('Failed to load last repo:', error);
    return null;
  }
};
