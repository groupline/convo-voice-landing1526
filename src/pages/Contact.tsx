import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Map from "@/components/Map";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add event listener to the iframe to detect form submission
    const iframe = document.getElementById('hidden6623005000000502096Frame');
    if (iframe) {
      iframe.addEventListener('load', () => {
        try {
          const doc = (iframe as HTMLIFrameElement).contentWindow?.document;
          if (doc?.body.childElementCount !== 0) {
            navigate('/thank-you');
          }
        } catch (error) {
          navigate('/thank-you');
        }
      });
    }

    // Add the script tag for form validation
    const script = document.createElement('script');
    script.id = 'wf_script';
    script.src = 'https://bigin.zoho.com/crm/WebformScriptServlet?rid=b5aacd64637fe2677a2e6f437053752a15b67b80204192b6dc4db936118fec69db6f287d6cd2b90a35cee4a6b0bd4f8bgid09a9025d48f23ad441aecf5a4f5a3a9d66c74edee4bc49b999a2df91f72414d7';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-600">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-primary" />
                  <address className="not-italic">
                    1309 Coffeen Avenue STE 1200<br />
                    Sheridan Wyoming 82801
                  </address>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-primary" />
                  <a href="mailto:contact@surgeai.com">contact@surgeai.com</a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-primary" />
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </div>
              </div>

              <Map />
            </div>

            <div>
              <div className='wf-parent' id='BiginWebToRecordFormParent6623005000000502096' style={{backgroundColor: '#EAEEF2'}}>
                <div className='wf-wrapper' id='BiginWebToRecordFormDiv6623005000000502096'>
                  <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                  <meta httpEquiv='content-type' content='text/html;charset=UTF-8' />
              <form 
                id='BiginWebToRecordForm6623005000000502096' 
                name='BiginWebToRecordForm6623005000000502096' 
                className='wf-form-component' 
                data-ux-form-alignment='top' 
                style={{fontFamily: 'Arial', position: 'relative', fontSize: '15px'}} 
                method='POST' 
                encType='multipart/form-data'
                target="hidden6623005000000502096Frame"
              >
                <input type='text' style={{display: 'none'}} name='xnQsjsdp' value='09a9025d48f23ad441aecf5a4f5a3a9d66c74edee4bc49b999a2df91f72414d7' />
                <input type='hidden' name='zc_gad' id='zc_gad' value='' />
                <input type='text' style={{display: 'none'}} name='xmIwtLD' value='b5aacd64637fe2677a2e6f437053752a15b67b80204192b6dc4db936118fec69db6f287d6cd2b90a35cee4a6b0bd4f8b' />
                <input type='text' style={{display: 'none'}} name='actionType' value='Q29udGFjdHM=' />
                <input type='text' style={{display: 'none'}} name='returnURL' value='null' />
                <div className='wf-header'>Contact Us</div>
                <div id='elementDiv6623005000000502096' className='wf-form-wrapper'>
                  <div className='wf-row'>  
                    <div className='wf-label'>First Name</div>
                    <div className='wf-field'>
                      <div className='wf-field-inner'>
                        <input name='First Name' maxLength={40} type='text' className='wf-field-item wf-field-input' />
                      </div>
                    </div>
                  </div>
                  <div className='wf-row'>  
                    <div className='wf-label'>Last Name</div>
                    <div className='wf-field wf-field-mandatory'>
                      <div className='wf-field-inner'>
                        <input name='Last Name' maxLength={80} type='text' className='wf-field-item wf-field-input' />
                      </div>
                    </div>
                  </div>
                  <div className='wf-row'>  
                    <div className='wf-label'>Email</div>
                    <div className='wf-field'>
                      <div className='wf-field-inner'>
                        <input name='Email' maxLength={100} type='email' className='wf-field-item wf-field-input' />
                      </div>
                    </div>
                  </div>
                  <div className='wf-row'>  
                    <div className='wf-label'>Company Name</div>
                    <div className='wf-field wf-field-mandatory'>
                      <div className='wf-field-inner'>
                        <input name='Accounts.Account Name' maxLength={200} type='text' className='wf-field-item wf-field-input' />
                      </div>
                    </div>
                  </div>
                  <div className='wf-row'>  
                    <div className='wf-label'>Website</div>
                    <div className='wf-field'>
                      <div className='wf-field-inner'>
                        <input name='Accounts.Website' maxLength={255} type='url' className='wf-field-item wf-field-input' />
                      </div>
                    </div>
                  </div>
                  <div className='wf-row'>  
                    <div className='wf-label'>Phone</div>
                    <div className='wf-field'>
                      <div className='wf-field-inner'>
                        <input name='Phone' maxLength={50} type='tel' className='wf-field-item wf-field-input' />
                      </div>
                    </div>
                  </div>
                  <div className='wf-row'>  
                    <div className='wf-label'>How Can We Help?</div>
                    <div className='wf-field'>
                      <div className='wf-field-inner'>
                        <textarea name='Description' maxLength={32000} className='wf-field-item wf-field-input' style={{resize: 'none'}} />
                      </div>
                    </div>
                  </div>
                  <div className='wform-btn-wrap' data-ux-pos='left'>
                    <input type='submit' className='wf-btn' data-ux-btn-type='default' style={{backgroundColor: '#1980d8', color: '#fff', border: '1px solid #1980d8', width: 'auto'}} value='Submit' />
                  </div>
                </div>
              </form>
              <iframe name="hidden6623005000000502096Frame" id="hidden6623005000000502096Frame" style={{display: 'none'}}></iframe>
                </div>
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
