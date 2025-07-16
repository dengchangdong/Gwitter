import 'github-markdown-css/github-markdown.css';
import { useTranslation } from 'react-i18next';
import { formatDate, ProcessedIssue, processLinksInHTML } from '../utils';
import Label from './Label';
import { IssueBody, IssueContent, IssueHeader } from './common/IssueLayout';
import { Spotlight } from './common/Spotlight';

const Issue = ({
  issue,
  repoOwner,
  repoName,
}: {
  issue: ProcessedIssue;
  repoOwner?: string;
  repoName?: string;
}) => {
  const { i18n } = useTranslation();
  const windowOpen = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="relative my-2 flex rounded-lg">
      <Spotlight />
      <div className="relative z-10 m-1.5 flex-1 overflow-hidden rounded-lg border border-gray-100 bg-white/80 p-5 text-sm shadow-sm transition-all">
        <div className="relative mb-2 flex flex-wrap items-center">
          <img
            src={issue.author.avatarUrl}
            onClick={() => windowOpen(issue.author.url)}
            className="mr-2 h-8 w-8 cursor-pointer rounded-full md:mr-2"
          />
          <span 
            onClick={() => windowOpen(issue.author.url)}
            className="cursor-pointer text-sm font-bold text-slate-800"
          >
            {issue.author.login}
          </span>
          <span className="ml-1 inline-flex items-center">
            <svg className="h-5 w-5 fill-blue-500 text-blue-500" viewBox="0 0 22 22">
              <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
            </svg>
          </span>
          <span className="mx-1 text-sm font-semibold text-gray-400">·</span>
          <span className="text-sm text-gray-400">
            {formatDate(issue.createdAt, i18n.language)}
          </span>
          <a
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            title="在 GitHub 中查看"
            className="ml-2 inline-flex items-center text-gray-400 transition-colors hover:text-slate-800"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          {issue.label.name !== 'default' && (
            <Label
              name={issue.label.name}
              color={issue.label.color}
              style={{
                position: 'absolute',
                right: 0,
              }}
            />
          )}
        </div>
        <div className="my-2 rounded border-l-3 border-gray-200 bg-slate-50 p-2 text-sm font-medium leading-snug text-gray-600">
          {issue.title}
        </div>
        <div
          className="markdown-body text-gray-800"
          dangerouslySetInnerHTML={{
            __html: processLinksInHTML(issue.bodyHTML),
          }}
        />
      </div>
    </div>
  );
};

export default Issue;
