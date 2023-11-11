import generateTOTP from "~utils/generateTfaCode";
import "./style.css";

function IndexPopup() {
  console.log(generateTOTP({ key: "FGPI3QA573GBEDBDMMCODWJVPMKDG4XI" }));
  return <div>Hello</div>;
}

export default IndexPopup;
