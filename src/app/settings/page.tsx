export default function SettingsPage() {
  return (
    <main style={{ position: "relative" }}>
      <div style={{"display":"flex","flexDirection":"column","minHeight":"100vh","fontFamily":"-apple-system, 'Segoe UI', Roboto, sans-serif"}}>
        <header style={{"padding":"24px 80px","borderBottom":"1px solid #e4e4e7"}}>
          <h1 style={{"fontSize":"32px","fontWeight":"600","margin":"0"}}>
            {"Settings"}
          </h1>
        </header>
        <main style={{"display":"flex","gap":"64px","padding":"48px 80px","maxWidth":"1280px","margin":"0 auto","width":"100%"}}>
          <nav style={{"width":"256px","display":"flex","flexDirection":"column","gap":"8px"}}>
            <button style={{"padding":"12px","textAlign":"left","borderRadius":"8px","fontWeight":"500","background":"#f4f4f5"}}>
              {"Account"}
            </button>
            <button style={{"padding":"12px","textAlign":"left","borderRadius":"8px","color":"#52525b"}}>
              {"Privacy & Sharing"}
            </button>
            <button style={{"padding":"12px","textAlign":"left","borderRadius":"8px","color":"#52525b"}}>
              {"Notifications"}
            </button>
          </nav>
          <section style={{"flex":"1"}}>
            <h2 style={{"fontSize":"24px","fontWeight":"600","marginBottom":"32px"}}>
              {"Account Settings"}
            </h2>
            <div style={{"display":"flex","flexDirection":"column","gap":"24px"}}>
              <div style={{"borderBottom":"1px solid #e4e4e7","paddingBottom":"24px"}}>
                <p style={{"fontWeight":"500"}}>
                  {"Email address"}
                </p>
                <p style={{"color":"#52525b","marginTop":"4px"}}>
                  {"eric.kim@example.com"}
                </p>
              </div>
              <div style={{"borderBottom":"1px solid #e4e4e7","paddingBottom":"24px"}}>
                <p style={{"fontWeight":"500"}}>
                  {"Phone number"}
                </p>
                <p style={{"color":"#52525b","marginTop":"4px"}}>
                  {"Added (+1) 555-0102"}
                </p>
              </div>
              <div style={{"borderBottom":"1px solid #e4e4e7","paddingBottom":"24px"}}>
                <p style={{"fontWeight":"500"}}>
                  {"Language"}
                </p>
                <p style={{"color":"#52525b","marginTop":"4px"}}>
                  {"English (US)"}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
}
