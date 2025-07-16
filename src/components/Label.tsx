import { getColorByBgColor } from '../utils';

interface LabelProps {
  name: string;
  color: string;
  style?: React.CSSProperties;
}

const Label: React.FC<LabelProps> = ({ name, color, style }) => {
  // 动态生成基于颜色的内联样式
  const textColor = getColorByBgColor(color);
  
  return (
    <span 
      className="inline-block rounded px-1.5 py-1 text-xs font-semibold shadow-inner"
      style={{
        ...style,
        backgroundColor: `#${color}`,
        color: textColor,
      }}
    >
      {name}
    </span>
  );
};

export default Label;
