interface ErrorProps {
  message?: string;
}

export const Error = ({ message = 'Error loading data. Please try again later.' }: ErrorProps) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg text-red-500">
      {message}
    </div>
  </div>
); 