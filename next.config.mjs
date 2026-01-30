/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "utfs.io"
            },
            {
                protocol: "https",
                hostname: "paldkdgawuouxbuehojq.supabase.co",
                pathname: "/storage/v1/object/public/**"
            }
        ]
    }
}

export default nextConfig