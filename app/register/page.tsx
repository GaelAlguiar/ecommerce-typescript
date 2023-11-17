import { Container } from "@mui/material";
import FormWrap from "../components/FromWrap";
import RegisterForm from "./RegisterForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Register;
