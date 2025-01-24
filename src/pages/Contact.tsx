import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="wf-parent" id="BiginWebToRecordFormParent6623005000000502096" style={{ backgroundColor: "#EAEEF2" }}>
          <div className="wf-wrapper" id="BiginWebToRecordFormDiv6623005000000502096">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <form
              id="BiginWebToRecordForm6623005000000502096"
              name="BiginWebToRecordForm6623005000000502096"
              className="wf-form-component"
              data-ux-form-alignment="top"
              style={{ fontFamily: "Arial", position: "relative", fontSize: "15px" }}
              method="POST"
              encType="multipart/form-data"
              target="hidden6623005000000502096Frame"
            >
              <input type="text" style={{ display: "none" }} name="xnQsjsdp" value="fffda106c8bee5693de99c88b7c7bf5b4d268e320d708974df163c0b08cc478a" />
              <input type="hidden" name="zc_gad" id="zc_gad" value="" />
              <input type="text" style={{ display: "none" }} name="xmIwtLD" value="a51d093103b8190084e96996b348c984182bfb0ad6c2c32665aa36e6177cc1f8d51a644c2cf8e73ac949a831b3f2781f" />
              <input type="text" style={{ display: "none" }} name="actionType" value="Q29udGFjdHM=" />
              <input type="hidden" name="rmsg" id="rmsg" value="true" />
              <input type="text" style={{ display: "none" }} name="returnURL" value="null" />
              
              <div className="wf-header">Contact Us</div>
              <div id="elementDiv6623005000000502096" className="wf-form-wrapper">
                <div className="wf-sec-wrap">
                  <div className="wf-row">
                    <div className="wf-label">Last Name</div>
                    <div className="wf-field wf-field-mandatory">
                      <div className="wf-field-inner">
                        <input name="Last Name" maxLength={80} type="text" className="wf-field-item wf-field-input" />
                      </div>
                    </div>
                  </div>
                  <div className="wf-row">
                    <div className="wf-label">Company Name</div>
                    <div className="wf-field wf-field-mandatory">
                      <div className="wf-field-inner">
                        <input name="Accounts.Account Name" maxLength={200} type="text" className="wf-field-item wf-field-input" />
                      </div>
                    </div>
                  </div>
                  <div className="wf-row">
                    <div className="wf-label">Email</div>
                    <div className="wf-field">
                      <div className="wf-field-inner">
                        <input name="Email" maxLength={100} type="email" className="wf-field-item wf-field-input" />
                      </div>
                    </div>
                  </div>
                  <div className="wf-row">
                    <div className="wf-label">Phone</div>
                    <div className="wf-field">
                      <div className="wf-field-inner">
                        <input name="Phone" maxLength={50} type="tel" className="wf-field-item wf-field-input" />
                      </div>
                    </div>
                  </div>
                  <div className="wf-row">
                    <div className="wf-label">How Can We Help?</div>
                    <div className="wf-field">
                      <div className="wf-field-inner">
                        <textarea name="Description" maxLength={32000} className="wf-field-item wf-field-input" style={{ resize: "none" }}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wform-btn-wrap" data-ux-pos="left">
                  <button type="submit" className="wf-btn bg-primary hover:bg-primary-dark text-white px-8 py-2">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;