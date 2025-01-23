import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if ('data' in error && typeof error.data === 'object' && error.data) {
    return (error.data as { message?: string }).message || 'An unknown error occurred.';
  }
  if ('message' in error) {
    return error.message || 'An unknown error occurred.';
  }
  if ('error' in error) {
    return (error as { error?: string }).error || 'An unknown error occurred.';
  }
  return 'An unknown error occurred.';
};