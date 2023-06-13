import { RecentKeywordItem } from '../../hooks';
import { AppItem } from '../../store/slices/menu-slice';

export interface ResultProps {
  apps: AppItem[];
  filterRecentKeywordMap: Record<string, RecentKeywordItem>;
  onClickRecentKeyword?: (target: string, source: string) => void;
  onRemoveRecentKeyword?: (target: string) => void;
}
