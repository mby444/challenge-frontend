// API Error Response Type
export interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
      statusCode?: number;
      error?: string;
    };
    status?: number;
  };
  message?: string;
}

// Helper function to extract error message from API errors
export function getErrorMessage(error: unknown): string {
  const apiError = error as ApiErrorResponse;
  return (
    apiError.response?.data?.message ||
    apiError.message ||
    "An unexpected error occurred"
  );
}
