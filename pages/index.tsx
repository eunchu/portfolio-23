import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 2vw;
  margin-bottom: 14px;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Item = styled.li`
  position: relative;

  width: 20vw;
  height: 20vw;

  min-width: 80px;
  max-width: 200px;
  min-height: 80px;
  max-height: 200px;
`;
const Box = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #8d8d8d;
  border-radius: 4px;

  cursor: pointer;
`;
const ForeignObject = styled.foreignObject`
  width: 100%;
  height: 100%;
`;
const ProjectName = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.8vw;
  color: white;
`;

const Home = () => {
  const boxVariants = {
    normal: {
      opacity: 0,
      pathLength: 0,
    },
    hover: (i: number) => {
      const delay = 1 + i * 0.5;
      return {
        opacity: 1,
        pathLength: 1,
        transition: {
          pathLength: {
            delay,
            type: "spring",
            duration: 1.5,
            bounce: 0,
          },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };
  const items = [
    {
      title: "Movie App",
      link: "/movieApp",
    },
    {
      title: "Ing...",
      link: "/",
    },
  ];

  return (
    <Container>
      <Title>Portfolio</Title>
      <Items>
        {items.map(({ title, link }: { title: string; link: string }) => (
          <Link key={title} href={link}>
            <Item>
              <Box>
                <motion.svg
                  width="100%"
                  height="100%"
                  initial="normal"
                  whileHover="hover"
                >
                  <motion.rect
                    variants={boxVariants}
                    width="100%"
                    height="100%"
                    fill="#8d8d8d"
                    stroke="white"
                    strokeWidth={1}
                    rx="4"
                  />
                  <ForeignObject>
                    <ProjectName>{title}</ProjectName>
                  </ForeignObject>
                </motion.svg>
              </Box>
            </Item>
          </Link>
        ))}
      </Items>
    </Container>
  );
};

export default Home;
