import styled from "styled-components";

const Btn = styled.button<{
  width: string;
  height: string;
  margin: string;
  disable: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-color: #dddddd;
  border-radius: 4px;
  opacity: ${(props) => props.disable && 0.5};

  margin: ${(props) => props.margin};
  cursor: ${(props) => (!props.disable ? "pointer" : "default")};
  span {
    font-family: "Noto Sans KR";
    font-size: 14px;
    color: #111111;
  }
`;

interface IButtonIconProps {
  width: string;
  height: string;
  margin?: string;
  size?: "small" | "middle" | "large";
  text: string;
  onClick?: any;
  disable?: boolean;
}
export const Button = ({
  width,
  height,
  margin,
  size,
  text,
  onClick,
  disable,
}: IButtonIconProps) => {
  return (
    <Btn
      width={width}
      height={height}
      margin={margin || "0"}
      disable={disable || false}
      onClick={onClick}
    >
      <span>{text}</span>
    </Btn>
  );
};
