import styled from "styled-components";

const Button = styled.div<{ width: string }>`
  display: flex;
  align-items: center;

  width: ${(props) => props.width};
  height: 32px;

  background-color: white;
  text-shadow: none;
  border-radius: 4px;

  padding: 0 16px;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
  span {
    font-size: 12px;
    color: #000000;
  }
`;
const Icon = styled.div`
  color: #000000;
  font-size: 14px;
  margin-right: 8px;
`;

interface IButtonIconProps {
  width?: string;
  size?: "small" | "middle" | "large";
  text: string;
  icon: React.ReactNode;
  onClick?: any;
}
export const ButtonIcon = ({
  width,
  size,
  text,
  icon,
  onClick,
}: IButtonIconProps) => {
  return (
    <Button width={width ?? "75px"} onClick={onClick}>
      <Icon>{icon}</Icon>
      <span>{text}</span>
    </Button>
  );
};
