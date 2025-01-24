import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="wf-parent" id="BiginWebToRecordFormParent6623005000000502096">
              <div className="wf-wrapper" id="BiginWebToRecordFormDiv6623005000000502096" style={{ maxWidth: '100%', border: 'none', boxShadow: 'none' }}>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <form
                  id="BiginWebToRecordForm6623005000000502096"
                  name="BiginWebToRecordForm6623005000000502096"
                  className="wf-form-component space-y-6"
                  method="POST"
                  encType="multipart/form-data"
                  target="hidden6623005000000502096Frame"
                  style={{ padding: 0 }}
                >
                  <input type="text" style={{ display: "none" }} name="xnQsjsdp" value="fffda106c8bee5693de99c88b7c7bf5b4d268e320d708974df163c0b08cc478a" />
                  <input type="hidden" name="zc_gad" id="zc_gad" value="" />
                  <input type="text" style={{ display: "none" }} name="xmIwtLD" value="a51d093103b8190084e96996b348c984182bfb0ad6c2c32665aa36e6177cc1f8d51a644c2cf8e73ac949a831b3f2781f" />
                  <input type="text" style={{ display: "none" }} name="actionType" value="Q29udGFjdHM=" />
                  <input type="hidden" name="rmsg" id="rmsg" value="true" />
                  <input type="text" style={{ display: "none" }} name="returnURL" value="null" />
                  
                  <div id="elementDiv6623005000000502096" className="space-y-6">
                    <div className="space-y-4">
                      <div className="form-group">
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <input 
                          name="Last Name" 
                          maxLength={80} 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium mb-2">Company Name *</label>
                        <input 
                          name="Accounts.Account Name" 
                          maxLength={200} 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                          name="Email" 
                          maxLength={100} 
                          type="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input 
                          name="Phone" 
                          maxLength={50} 
                          type="tel" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="block text-sm font-medium mb-2">How Can We Help?</label>
                        <textarea 
                          name="Description" 
                          maxLength={32000} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent min-h-[120px]"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;