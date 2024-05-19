/** @format */
import Row from "../ui/Row";
import UpdateSettingsForm from "./../features/settings/UpdateSettingsForm";
import Heading from "./../ui/Heading";

function Settings() {
  return (
    <Row>
      <Heading>Settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
