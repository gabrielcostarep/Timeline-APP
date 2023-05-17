import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree
} from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree'
})

export const metadata = {
  title: 'Timeline',
  description:
    'Uma cápsula do tempo construida com React, Next.js, TailwindCSS e TypeScript.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable}} font-sans bg-gray-900 text-gray-100`}
      >
        {children}
      </body>
    </html>
  )
}
