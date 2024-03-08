import React, { useEffect } from 'react'
import { toast } from '../use-toast'

/**
 * This hook shows a warning toast if the screen size is less than 768px.
 */

export default function useScreenSizeWarningToast() {
  useEffect(() => {
    if (window.innerWidth <= 768 && !sessionStorage.getItem('toastShown')) {
      toast({
        title: 'Not optimized for mobile devices!',
        description:
          "The editor is not optimized for mobile devices, hence many feature won't work as expected. Please use a desktop device for the best experience.",
      })
      sessionStorage.setItem('toastShown', 'true')
    }
  }, [])
}
