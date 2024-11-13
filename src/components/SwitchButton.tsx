interface SwitchButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

export const SwitchButton = ({ isActive, onClick, label }: SwitchButtonProps) => (
  <button
    className={`smooth-button ${
      isActive
        ? 'bg-white shadow-md text-gray-800'
        : 'text-gray-600 hover:text-gray-800'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
) 