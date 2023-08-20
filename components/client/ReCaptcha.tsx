"use client"

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

import React, {ReactNode} from 'react'

interface ProviderProps {
  children: ReactNode;
}

const ReCaptcha: React.FC<ProviderProps> = ({children}) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="your-site-key">
        {children}
      </GoogleReCaptchaProvider>
  )
}

export default ReCaptcha