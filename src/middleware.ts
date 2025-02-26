import withAuth from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: '/login',
    }
})

export const config = {
    matcher: ["/admin/:path*"] // protège toutes les pages enfants de /admin
}