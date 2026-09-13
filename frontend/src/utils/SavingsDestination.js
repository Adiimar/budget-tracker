// Preset savings destinations with icon + color theme.
// destinationType is stored on the backend so the frontend can re-derive styling.

export const SAVINGS_PRESETS = [
  {
    name: 'Landbank',
    type: 'BANK',
    gradient: 'from-emerald-500 to-green-600',
    icon: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    name: 'GoTyme',
    type: 'EWALLET',
    gradient: 'from-purple-500 to-fuchsia-600',
    icon: (
      <>
        <rect x="2" y="6" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <circle cx="17" cy="15" r="1.5" />
      </>
    ),
  },
];

export const CUSTOM_DESTINATION_TYPE = 'CUSTOM';

export const getDestinationStyle = (destinationType) => {
  if (destinationType === 'BANK') return SAVINGS_PRESETS[0];
  if (destinationType === 'EWALLET') return SAVINGS_PRESETS[1];
  return {
    gradient: 'from-blue-500 to-sky-600',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  };
};