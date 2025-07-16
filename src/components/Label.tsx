import styled from '@emotion/styled';
import { getColorByBgColor } from '../utils';

interface LabelProps {
  name: string;
  color: string;
  style?: React.CSSProperties;
}

const LabelContainer = styled.span<{ bgColor: string }>`
  display: inline-block;
  line-height: 1;
  padding: 5px 6px;
  font-size: 0.9em;
  font-weight: 600;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 0.12);
  background-color: #${(props) => props.bgColor};
  color: ${(props) => getColorByBgColor(props.bgColor)};
`;

const Label: React.FC<LabelProps> = ({ name, color, style }) => {
  return (
    <LabelContainer style={style} bgColor={color}>
      {name}
    </LabelContainer>
  );
};

export default Label;
