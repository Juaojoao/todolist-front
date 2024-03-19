import { color } from '@material-tailwind/react/types/components/alert';

interface Colors {
  red: color;
  yellow: color;
  green: color;
}

interface ProgressBarProps {
  completedTasks: number;
  totalTasks: number;
}

export const progressBar = ({
  completedTasks,
  totalTasks,
}: ProgressBarProps) => {
  if (!completedTasks || !totalTasks) return;

  const colors: Colors = {
    red: 'red',
    yellow: 'yellow',
    green: 'green',
  };

  const progressPercent = (completedTasks / totalTasks) * 100;

  if (progressPercent < 50) {
    return { color: colors.red, percent: progressPercent };
  } else if (progressPercent < 75) {
    return { color: colors.yellow, percent: progressPercent };
  } else {
    return { color: colors.green, percent: progressPercent };
  }
};
