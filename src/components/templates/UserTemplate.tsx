import BaseLayout from "../atoms/BaseLayout";
import SideMenu from "../organisms/SideMenu";

function UserTemplate() {
  return (
    <BaseLayout>
      <SideMenu />
      <div>1</div>
      <div>2</div>
    </BaseLayout>
  );
}

export default UserTemplate;
