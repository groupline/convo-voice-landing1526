import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = {
        name: (event.currentTarget.elements.namedItem('Last Name') as HTMLInputElement).value,
        email: (event.currentTarget.elements.namedItem('Email') as HTMLInputElement).value,
        phone: (event.currentTarget.elements.namedItem('Phone') as HTMLInputElement).value,
        message: (event.currentTarget.elements.namedItem('Description') as HTMLTextAreaElement).value,
      };

      const { error } = await supabase.functions.invoke('contact', {
        body: JSON.stringify(formData),
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });

      // Reset form
      event.currentTarget.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='wf-parent' id='BiginWebToRecordFormParent6623005000000502096' style={{backgroundColor: '#EAEEF2'}}>
        <div className='wf-wrapper' id='BiginWebToRecordFormDiv6623005000000502096'>
          <form 
            id='BiginWebToRecordForm6623005000000502096' 
            className='wf-form-component' 
            data-ux-form-alignment='top' 
            style={{fontFamily: 'Arial', position: 'relative', fontSize: '15px'}}
            onSubmit={handleSubmit}
          >
            <div className='wf-header'>Contact Us</div>
            <div id='elementDiv6623005000000502096' className='wf-form-wrapper'>
              <div className='wf-sec-wrap'>
                <div className='wf-sec-head'>
                  <div className='wf-sec-title'>Contact Information</div>
                </div>
                <div className='wf-row'>  
                  <div className='wf-label'>Last Name</div>
                  <div className='wf-field wf-field-mandatory'>
                    <div className='wf-field-inner'>
                      <input 
                        name='Last Name' 
                        maxLength={80} 
                        type='text' 
                        className='wf-field-item wf-field-input' 
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div className='wf-row'>  
                  <div className='wf-label'>Email</div>
                  <div className='wf-field wf-field-mandatory'>
                    <div className='wf-field-inner'>
                      <input 
                        name='Email' 
                        type='email' 
                        maxLength={100} 
                        className='wf-field-item wf-field-input'
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div className='wf-row'>  
                  <div className='wf-label'>Phone</div>
                  <div className='wf-field'>
                    <div className='wf-field-inner'>
                      <input 
                        name='Phone' 
                        type='tel' 
                        maxLength={50} 
                        className='wf-field-item wf-field-input'
                      />
                    </div>
                  </div>
                </div>
                <div className='wf-row'>  
                  <div className='wf-label'>How Can We Help?</div>
                  <div className='wf-field wf-field-mandatory'>
                    <div className='wf-field-inner'>
                      <textarea 
                        name='Description' 
                        maxLength={32000} 
                        className='wf-field-item wf-field-input' 
                        style={{resize: 'none'}}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='wform-btn-wrap' data-ux-pos='left'>
                <button 
                  type='submit' 
                  className='wf-btn' 
                  data-ux-btn-type='default' 
                  style={{backgroundColor: '#1980d8', color: '#fff', border: '1px solid #1980d8', width: 'auto'}}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}