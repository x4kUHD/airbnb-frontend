export default function NewPagePage() {
  return (
    <main style={{ position: "relative" }}>
      
    
  <div style={{ background: "#FFFFFF", padding: "48px 80px 64px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
    <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
      <h1 style={{ margin: "0 0 8px", fontSize: "32px", fontWeight: "600", lineHeight: "36px", color: "#222222" }}>Contact us</h1>
      <p style={{ margin: "0 0 40px", fontSize: "16px", lineHeight: "22px", color: "#717171" }}>Questions about a reservation, a listing or your account? Send us a message and we'll get back to you within 24 hours.</p>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "48px" }}>
        <div style={{ flex: "1.4", minWidth: "0", border: "1px solid #DDDDDD", borderRadius: "12px", padding: "32px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <h2 style={{ margin: "0 0 24px", fontSize: "22px", fontWeight: "600", lineHeight: "26px", color: "#222222" }}>Send us a message</h2>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: "1", minWidth: "0" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", lineHeight: "16px", color: "#717171" }}>First name</label>
            </div>
            <div style={{ flex: "1", minWidth: "0" }}>
              <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", lineHeight: "16px", color: "#717171" }}>Last name</label>
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", lineHeight: "16px", color: "#717171" }}>Email address</label>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", lineHeight: "16px", color: "#717171" }}>What is this about?</label>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "12px", lineHeight: "16px", color: "#717171" }}>Message</label>
          </div>
          <button style={{ width: "100%", border: "none", borderRadius: "8px", background: "#FF385C", padding: "14px", fontSize: "16px", fontWeight: "600", color: "#FFFFFF", cursor: "pointer" }}>Send message</button>
          <p style={{ margin: "16px 0 0", fontSize: "12px", lineHeight: "16px", color: "#717171" }}>
            <span>By sending this message you agree to our</span>
            <a style={{ fontWeight: "600", color: "#222222", textDecoration: "underline" }} href={"#"}>Privacy Policy</a>
            <span>.</span>
          </p>
        </div>
        <div style={{ flex: "1", minWidth: "0" }}>
          <div style={{ border: "1px solid #DDDDDD", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "600", lineHeight: "20px", color: "#222222" }}>Visit the Help Centre</h3>
            <p style={{ margin: "0 0 12px", fontSize: "14px", lineHeight: "20px", color: "#717171" }}>gfgffg'</p>
            <a style={{ fontSize: "14px", fontWeight: "600", color: "#222222", textDecoration: "underline" }} href={"#"}>Browse articles</a>
          </div>
          <div style={{ border: "1px solid #DDDDDD", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "600", lineHeight: "20px", color: "#222222" }}>Message your host</h3>
            <p style={{ margin: "0 0 12px", fontSize: "14px", lineHeight: "20px", color: "#717171" }}>For anything about a specific stay — check-in, directions, house rules — your host replies fastest.</p>
            <a style={{ fontSize: "14px", fontWeight: "600", color: "#222222", textDecoration: "underline" }} href={"/profile"}>Go to your trips</a>
          </div>
          <div style={{ border: "1px solid #DDDDDD", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: "600", lineHeight: "20px", color: "#222222" }}>Call us</h3>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", paddingBottom: "8px" }}>
              <span style={{ fontSize: "14px", lineHeight: "20px", color: "#717171" }}>United States</span>
              <span style={{ fontSize: "14px", fontWeight: "600", lineHeight: "20px", color: "#222222" }}>+1 (844) 234-2500</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", paddingBottom: "8px" }}>
              <span style={{ fontSize: "14px", lineHeight: "20px", color: "#717171" }}>United Kingdom</span>
              <span style={{ fontSize: "14px", fontWeight: "600", lineHeight: "20px", color: "#222222" }}>+44 203 318 1111</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
              <span style={{ fontSize: "14px", lineHeight: "20px", color: "#717171" }}>Hours</span>
              <span style={{ fontSize: "14px", fontWeight: "600", lineHeight: "20px", color: "#222222" }}>24 hours, every day</span>
            </div>
          </div>
          <div style={{ border: "1px solid #DDDDDD", borderRadius: "12px", background: "#F7F7F7", padding: "24px" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "600", lineHeight: "20px", color: "#FF385C" }}>Safety emergency</h3>
            <p style={{ margin: "0", fontSize: "14px", lineHeight: "20px", color: "#717171" }}>If you or someone else is in immediate danger, contact local emergency services first, then our Safety Line.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
  );
}
