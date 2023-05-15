import styled from "styled-components";

const Button = styled.button<{ width: string; height: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-color: #009dff;
  border-radius: 4px;

  cursor: pointer;
  span {
    font-family: "Noto Sans KR";
    font-size: 14px;
    color: #ffffff;
  }
`;

interface IButtonIconProps {
  width: string;
  height: string;
  size?: "small" | "middle" | "large";
  text: string;
  onClick?: any;
}
export const ButtonPrimary = ({
  width,
  height,
  size,
  text,
  onClick,
}: IButtonIconProps) => {
  return (
    <Button width={width} height={height} onClick={onClick}>
      <span>{text}</span>
    </Button>
  );
};
