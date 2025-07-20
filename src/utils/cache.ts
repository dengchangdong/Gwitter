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
