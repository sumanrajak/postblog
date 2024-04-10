import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '../styles/global.css'
import "@uploadthing/react/styles.css";

export const metadata= {
    title:"postblog",
    description:"bloading application"
}
const RootLayout = ( {children}) => {
  return (
    <html lang="en">
        <body  suppressHydrationWarning={true} >
        <Provider>

            <div className="main">
            </div>
            <main className="app">
                <Nav/>
                <div className='blank bg_color'></div>
                {children}
            </main>
            </Provider>

        </body>
    </html>
  )
}

export default RootLayout