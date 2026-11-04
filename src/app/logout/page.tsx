export default function LogoutPage() {
  return (
    <main style={{ position: "relative" }}>
      <div style={{"minHeight":"805px","display":"flex","alignItems":"center","justifyContent":"center","background":"#F7F7F7","padding":"40px 16px","fontFamily":"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"}}>
        <div style={{"width":"100%","maxWidth":"568px","overflow":"hidden","borderRadius":"12px","border":"1px solid #DDDDDD","background":"#FFFFFF","boxShadow":"0 2px 16px rgba(0,0,0,0.12)"}}>
          <div style={{"position":"relative","display":"flex","height":"64px","alignItems":"center","justifyContent":"center","borderBottom":"1px solid #DDDDDD","padding":"0 24px"}}>
            <a style={{"position":"absolute","left":"16px","display":"flex","height":"32px","width":"32px","alignItems":"center","justifyContent":"center","borderRadius":"9999px","color":"#222222","fontSize":"16px","lineHeight":"1","textDecoration":"none"}} href={"/settings"}>
              {"✕"}
            </a>
            <span style={{"fontSize":"16px","fontWeight":"600","lineHeight":"20px","color":"#222222"}}>
              {"Log out"}
            </span>
          </div>
          <div style={{"padding":"24px"}}>
            <div style={{"display":"flex","alignItems":"center","gap":"12px","paddingBottom":"24px"}}>
              <div style={{"display":"flex","height":"48px","width":"48px","flexShrink":"0","alignItems":"center","justifyContent":"center","borderRadius":"9999px","background":"#FF385C","fontSize":"18px","fontWeight":"600","color":"#FFFFFF"}}>
                {"A"}
              </div>
              <div style={{"minWidth":"0"}}>
                <div style={{"fontSize":"16px","fontWeight":"600","lineHeight":"20px","color":"#222222"}}>
                  {"Alex Morgan"}
                </div>
                <div style={{"fontSize":"14px","lineHeight":"18px","color":"#717171"}}>
                  {"alex.morgan@example.com"}
                </div>
              </div>
            </div>
            <h1 style={{"margin":"0","paddingBottom":"8px","fontSize":"22px","fontWeight":"600","lineHeight":"26px","color":"#222222"}}>
              {"Log out of Airbnb please?"}
            </h1>
            <p style={{"margin":"0","paddingBottom":"24px","fontSize":"14px","lineHeight":"20px","color":"#717171"}}>
              {"You'll need to log in again to manage your trips, messages and listings. Any dates you've selected but not booked won't be saved."}
            </p>
            <button style={{"width":"100%","border":"none","borderRadius":"8px","background":"#FF385C","padding":"14px","fontSize":"16px","fontWeight":"600","color":"#FFFFFF","cursor":"pointer"}}>
              {"Log out"}
            </button>
            <a style={{"marginTop":"12px","display":"block","width":"100%","boxSizing":"border-box","border":"1px solid #222222","borderRadius":"8px","background":"#FFFFFF","padding":"13px","textAlign":"center","fontSize":"16px","fontWeight":"600","color":"#222222","textDecoration":"none"}} href={"/settings"}>
              {"Cancel"}
            </a>
            <div style={{"display":"flex","alignItems":"center","gap":"16px","margin":"20px 0"}}>
              <span style={{"height":"1px","flex":"1","background":"#DDDDDD"}} />
              <span style={{"fontSize":"12px","lineHeight":"16px","color":"#222222"}}>
                {"or"}
              </span>
              <span style={{"height":"1px","flex":"1","background":"#DDDDDD"}} />
            </div>
            <button style={{"width":"100%","border":"1px solid #DDDDDD","borderRadius":"8px","background":"#FFFFFF","padding":"13px","fontSize":"14px","fontWeight":"600","color":"#222222","cursor":"pointer"}}>
              {"Log out of all devices"}
            </button>
            <p style={{"margin":"16px 0 0","fontSize":"12px","lineHeight":"16px","color":"#717171"}}>
              <span>
                {"Logging out of all devices ends every active session on your account, including phones and tablets you no longer use. Learn more in our"}
              </span>
              <a style={{"fontWeight":"600","color":"#222222","textDecoration":"underline"}} href={"#"}>
                {"Privacy Policy"}
              </a>
              <span>
                {"."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
