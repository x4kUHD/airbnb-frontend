export default function SettingsPage() {
  return (
    <main style={{ position: "relative" }}>
      <div style={{"display":"flex","flexDirection":"column","minHeight":"100vh","fontFamily":"-apple-system, 'Segoe UI', Roboto, sans-serif","color":"#222222"}}>
        <header style={{"borderBottom":"1px solid #dddddd","padding":"24px 80px"}}>
          <div style={{"fontSize":"24px","fontWeight":"700","color":"#ff385c"}}>
            {"airbnb"}
          </div>
        </header>
        <main style={{"maxWidth":"800px","margin":"0 auto","padding":"48px 24px","width":"100%"}}>
          <h1 style={{"fontSize":"32px","fontWeight":"600","marginBottom":"48px"}}>
            {"Settings"}
          </h1>
          <div style={{"display":"flex","flexDirection":"column","gap":"32px"}}>
            <section style={{"borderBottom":"1px solid #dddddd","paddingBottom":"32px"}}>
              <h2 style={{"fontSize":"18px","fontWeight":"600","marginBottom":"16px"}}>
                {"Account Preferences"}
              </h2>
              <div style={{"display":"flex","flexDirection":"column","gap":"16px"}}>
                <div style={{"display":"flex","justifyContent":"between","alignItems":"center"}}>
                  <div>
                    <div style={{"fontWeight":"500"}}>
                      {"Language"}
                    </div>
                    <div style={{"color":"#717171","fontSize":"14px"}}>
                      {"Choose your preferred language"}
                    </div>
                  </div>
                  <button style={{"fontWeight":"600","textDecoration":"underline"}}>
                    {"Edit"}
                  </button>
                </div>
                <div style={{"display":"flex","justifyContent":"between","alignItems":"center"}}>
                  <div>
                    <div style={{"fontWeight":"500"}}>
                      {"Currency"}
                    </div>
                    <div style={{"color":"#717171","fontSize":"14px"}}>
                      {"Manage your payment currency"}
                    </div>
                  </div>
                  <button style={{"fontWeight":"600","textDecoration":"underline"}}>
                    {"Edit"}
                  </button>
                </div>
              </div>
            </section>
            <section style={{"borderBottom":"1px solid #dddddd","paddingBottom":"32px"}}>
              <h2 style={{"fontSize":"18px","fontWeight":"600","marginBottom":"16px"}}>
                {"Notifications"}
              </h2>
              <div style={{"display":"flex","justifyContent":"between","alignItems":"center"}}>
                <div>
                  <div style={{"fontWeight":"500"}}>
                    {"Email Notifications"}
                  </div>
                  <div style={{"color":"#717171","fontSize":"14px"}}>
                    {"Updates on trips and account activity"}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </main>
  );
}
