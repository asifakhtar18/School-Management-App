export default function LargeButton({ name, onClick, bgClr, color, ...rest }) {
  return (
    <button
      {...rest}
      style={{
        textTransform: "none",
        backgroundColor: "#626367",
        color: "white",
        width: "200px",
        borderRadius: "16px",
        padding: "5px 15px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        transition: "all 0.3s ease",
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
