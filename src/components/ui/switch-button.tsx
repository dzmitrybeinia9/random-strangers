interface SwitchButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

export const SwitchButton = ({ isActive, onClick, label }: SwitchButtonProps) => (
  <button
    className={`transition-all duration-200 px-4 py-2 rounded-lg ${
      isActive
        ? 'bg-white shadow-md text-gray-800'
        : 'text-gray-600 hover:text-gray-800'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
) 