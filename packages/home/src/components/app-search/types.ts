import { AppItem, RecentKeywordItem } from '../../hooks';

export interface ResultProps {
  apps: AppItem[];
  filterRecentKeywordMap: Record<string, RecentKeywordItem>;
  onClickRecentKeyword?: (target: string, source: string) => void;
  onRemoveRecentKeyword?: (target: string) => void;
}
