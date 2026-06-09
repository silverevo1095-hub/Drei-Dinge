import { ImageResponse } from 'next/og'

export const size = { width: 192, height: 192 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1c1917',
          borderRadius: '48px',
        }}
      >
        <span
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#fafaf9',
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          3
        </span>
      </div>
    ),
    { ...size },
  )
}
