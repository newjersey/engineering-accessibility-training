"use client"

import loadingIcon from "public/loading.gif"

const LoadingSpinner = ({ loading, children }: { loading: boolean, children: React.ReactNode }) => {
  return loading ? <div style={{ textAlign: 'center' }}>
    <img style={{ maxHeight: '20vh' }} src={loadingIcon.src} alt="Loading" />
  </div> : children
}

export default LoadingSpinner;