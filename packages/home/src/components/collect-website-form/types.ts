import React from 'react';

export type FormState = {
  title: string;
  url: string;
  iconTarget: string;
  id: string;
};

export type ErrorState = {
  field: string;
  message?: React.ReactNode;
};

export interface CollectWebsiteFormProps {
  value?: FormState;
  onChange?: (payload: Partial<FormState>) => void;
  errors?: ErrorState[];
}
