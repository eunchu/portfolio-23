import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

const Container = styled.footer`
  display: flex;
  align-items: center;

  border-top: 1px solid #474747ff;

  margin: 0 4%;
  padding: 20px 0;
`;
const Copy = styled.p`
  color: ${(props) => props.theme.color.textFooter};
  margin-right: 30px;
`;
const LinkWrap = styled(motion.div)`
  color: yellow;
  cursor: pointer;
`;
const Info = styled.p`
  color: ${(props) => props.theme.color.textSub};

  margin-left: 10px;
`;

const Footer = () => {
  return (
    <Container>
      <Copy>eunju portfolio</Copy>
      <LinkWrap
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration: 2, repeat: Infinity }}
      >
        <Link
          href={"https://github.com/eunchu/portfolio-23"}
          target="_blank"
          title="코드 보러가기"
        >
          <FontAwesomeIcon icon={faCodeBranch} />
        </Link>
      </LinkWrap>
      <Info>{"<-"} Code 보러가기 👩‍💻</Info>
    </Container>
  );
};

export default Footer;
