import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

export const HEADER_HEIGHT = "100px";
const Header = () => {
  return (
    <HeaderCantainer>
      <Logo src="/images/로고.png"></Logo>
      <ProjectTitle>프로젝트 이름</ProjectTitle>
      <FaUserCircle size={40} />
    </HeaderCantainer>
  );
};

export default Header;

const HeaderCantainer = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #7e7e7e;
  padding: 0 25px;
`;

const Logo = styled.img`
  width: 70px;
  height: 60px;
`;

const ProjectTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
`;
