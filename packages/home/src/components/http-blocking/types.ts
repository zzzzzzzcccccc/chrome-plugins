import { HttpResponseHeader } from '../../model';

export interface ItemProps {
  id: string;
  enabled: boolean;
}

export interface ResponseHeaderProps {
  list: HttpResponseHeader[];
  onChange?: (field: string, index: number, value: string) => void;
  onDelete?: (index: number) => void;
  onAdd?: () => void;
  onDeleteAll?: () => void;
  readonly?: boolean;
}
