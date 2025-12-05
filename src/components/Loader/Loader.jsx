export default function Loader() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{
        height: 6, width: 120, borderRadius: 999,
        background: "linear-gradient(90deg,#eee 25%,#f5f5f5 37%,#eee 63%)",
        backgroundSize: "400% 100%", animation: "ldr 1.4s ease infinite"
      }} />
      <style>{`@keyframes ldr{0%{background-position:100% 0}100%{background-position:0 0}}`}</style>
    </div>
  );
}
