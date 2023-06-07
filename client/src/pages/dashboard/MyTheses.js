import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/MyThesisPage";
import MyThesis from "../../components/MyThesis";
const MyTheses = () => {
  const { getProfessorTheses, theses } = useAppContext();

  useEffect(() => {
    getProfessorTheses();
  }, []);

  return (
    <Wrapper>
      {theses.map((thesis) => {
        return <MyThesis key={thesis._id} {...thesis} />;
      })}
    </Wrapper>
  );
};

export default MyTheses;
