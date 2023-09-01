import { useNavigate } from "react-router-dom";
import Button from "./Button";

type BackButtonProps = {
  navRoute: string;
};

export default function BackButton({ navRoute }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(navRoute);
      }}
    >
      &larr; Back
    </Button>
  );
}
