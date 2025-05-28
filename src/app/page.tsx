'use client'

import './globals.css'

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl text-center font-bold text-white mb-8'>Welcome to My Apps!</h1>
        <p className='py-4 text-center text-2xl sm:text-3xl md:text-4xl text-white'>
          Go to
          <a href="./toeic" className='custom-link mx-2'> TOEIC Scoring App</a>
        </p>
        <p className='py-4 text-center text-2xl sm:text-3xl md:text-4xl text-white'>
          Go to
          <a href="./todo" className='custom-link mx-2'> ToDo App</a>
        </p>
        <p className='py-4 text-center text-2xl sm:text-3xl md:text-4xl text-white'>
          Go to
          <a href="./blog" className='custom-link mx-2'> Blog</a>
        </p>
      </div>

      {/* リンクの色を変更するためのスタイル このスタイルはこのファイル内でしか使えない */}
      <style jsx>{`
        .custom-link {
          color: #f9c74f; /* リンクの色 */
          text-decoration: none; /* 下線を消す */
          transition: color 0.3s ease; /* 色の変化にアニメーションを追加 */
        }

        .custom-link:hover {
          color: #f94144; /* hover時の色 */
          text-decoration: underline; /* hover時に下線を追加 */
        }
      `}</style>
    </>
  )
}
