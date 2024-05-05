import "./../../App.css";
export function Header() {
  return (
    <div
      className="google-font"
      style={{
        height: "70px",
        background: "#ffffff",
        fontSize: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      Drag and Drop Items to change their folders
    </div>
  );
}
