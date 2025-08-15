"use client"
import loadingIcon from "public/loading.gif"

export const LoadingSpinner = ({ loading, children }: { loading: boolean, children: React.ReactNode }) => {
  return loading ? <div style={{ textAlign: 'center' }}>
    <img style={{ maxHeight: '20vh', opacity: 0.2 }} src={loadingIcon.src} tabIndex={4} alt="Loading" />
  </div> : children
}