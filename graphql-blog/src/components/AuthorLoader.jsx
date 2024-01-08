import { MagnifyingGlass } from "react-loader-spinner";

function AuthorLoader() {
  return (
    <div
      style={{
        width: "100%",
        height: "1000px",
        display: "flex",
        justifyContent: "center",
        paddingTop: "100px",
      }}
    >
      <MagnifyingGlass
        height="100"
        width="100"
        color="gray"
        ariaLabel="loading"
      />
    </div>
  );
}

export default AuthorLoader;
