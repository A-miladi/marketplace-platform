import { Spinner } from "../ui";

const AppLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black/15 backdrop-blur-sm">
      <Spinner color="white" size="large" />
    </div>
  );
};

export default AppLoader;
